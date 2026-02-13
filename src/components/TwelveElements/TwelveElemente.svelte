<script lang="ts">
    import { onMount } from "svelte";
    import ElementImportanceCloud from "./ElementImportanceCloud.svelte";

    const ELEMENTS = [
        "Scope",
        "Tijd",
        "Kosten",
        "Contract",
        "Kwaliteit",
        "Team",
        "Communicatie",
        "Risico",
        "HSE",
        "Stakeholders",
        "Procurement",
        "Change",
    ] as const;

    const ADVANCED_FIELDS = [
        { key: "impact", label: "Impact" },
        { key: "tijdskritisch", label: "Tijdskritisch" },
        { key: "onzekerheid", label: "Onzekerheid" },
    ] as const;

    const SIMPLE_FIELDS = [
        { key: "inschatting", label: "Inschatting" },
    ] as const;

    type Mode = "advanced" | "simple";
    type AdvancedKey = (typeof ADVANCED_FIELDS)[number]["key"];
    type SimpleKey = (typeof SIMPLE_FIELDS)[number]["key"];
    type FieldKey = AdvancedKey | SimpleKey;

    interface ElementRow {
        element: (typeof ELEMENTS)[number];
        impact: number;
        tijdskritisch: number;
        onzekerheid: number;
        inschatting: number;
        note: string;
    }

    const MIN_SCORE = 1;
    const MAX_SCORE = 5;

    let mode = $state<Mode>("advanced");
    let rows = $state<ElementRow[]>([]);
    let weights = $state<Record<FieldKey, number>>({
        impact: 1,
        tijdskritisch: 1,
        onzekerheid: 1,
        inschatting: 1,
    });
    let initialized = $state(false);

    function createDefaultRows(): ElementRow[] {
        return ELEMENTS.map((element) => ({
            element,
            impact: 3,
            tijdskritisch: 3,
            onzekerheid: 3,
            inschatting: 3,
            note: "",
        }));
    }

    function clampScore(value: number): number {
        if (!Number.isFinite(value)) return MIN_SCORE;
        return Math.min(MAX_SCORE, Math.max(MIN_SCORE, value));
    }

    function normalizeInteger(value: unknown, fallback = 3): number {
        if (typeof value !== "number") return fallback;
        return clampScore(Math.round(value));
    }

    function normalizeWeight(value: unknown): number {
        if (typeof value !== "number" || !Number.isFinite(value)) return 1;
        return Math.max(0, value);
    }

    function encodeState(): string {
        const compact = {
            m: mode,
            w: {
                impact: weights.impact,
                tijdskritisch: weights.tijdskritisch,
                onzekerheid: weights.onzekerheid,
                inschatting: weights.inschatting,
            },
            r: rows.map((row) => [
                row.impact,
                row.tijdskritisch,
                row.onzekerheid,
                row.inschatting,
                row.note,
            ]),
        };

        return btoa(JSON.stringify(compact));
    }

    function decodeState(encoded: string) {
        try {
            const parsed = JSON.parse(atob(encoded));
            mode = parsed.m === "simple" ? "simple" : "advanced";

            if (parsed.w && typeof parsed.w === "object") {
                weights.impact = normalizeWeight(parsed.w.impact);
                weights.tijdskritisch = normalizeWeight(parsed.w.tijdskritisch);
                weights.onzekerheid = normalizeWeight(parsed.w.onzekerheid);
                weights.inschatting = normalizeWeight(parsed.w.inschatting);
            }

            if (
                Array.isArray(parsed.r) &&
                parsed.r.length === ELEMENTS.length
            ) {
                rows = ELEMENTS.map((element, index) => {
                    const row = parsed.r[index];
                    return {
                        element,
                        impact: normalizeInteger(row?.[0]),
                        tijdskritisch: normalizeInteger(row?.[1]),
                        onzekerheid: normalizeInteger(row?.[2]),
                        inschatting: normalizeInteger(row?.[3]),
                        note: typeof row?.[4] === "string" ? row[4] : "",
                    };
                });
            }
        } catch (error) {
            console.error("Failed to decode 12-elements state:", error);
        }
    }

    function weightedSimple(row: ElementRow): number {
        return row.inschatting * weights.inschatting;
    }

    function weightedAdvanced(row: ElementRow): Record<AdvancedKey, number> {
        return {
            impact: row.impact * weights.impact,
            tijdskritisch: row.tijdskritisch * weights.tijdskritisch,
            onzekerheid: row.onzekerheid * weights.onzekerheid,
        };
    }

    let results = $derived.by(() => {
        const isAdvanced = mode === "advanced";

        return rows
            .map((row) => {
                const advancedValues = weightedAdvanced(row);
                const simpleValue = weightedSimple(row);
                const score = isAdvanced
                    ? advancedValues.impact *
                      advancedValues.tijdskritisch *
                      advancedValues.onzekerheid
                    : simpleValue;

                return {
                    element: row.element,
                    values: advancedValues,
                    simple: simpleValue,
                    score,
                    note: row.note,
                };
            })
            .sort((a, b) => b.score - a.score);
    });

    function scoreColor(value: number): string {
        if (value >= 60) return "text-teal-300";
        if (value >= 30) return "text-cyan-300";
        return "text-slate-300";
    }

    onMount(() => {
        rows = createDefaultRows();

        const params = new URLSearchParams(window.location.search);
        const data = params.get("data");
        if (data) {
            decodeState(data);
        }

        initialized = true;
    });

    let syncTimer: ReturnType<typeof setTimeout> | undefined;

    $effect(() => {
        mode;
        JSON.stringify(rows);
        JSON.stringify(weights);

        if (!initialized) return;

        clearTimeout(syncTimer);
        syncTimer = setTimeout(() => {
            const url = new URL(window.location.href);
            url.searchParams.set("data", encodeState());
            window.history.replaceState({}, "", url.toString());
        }, 250);
    });
</script>

<div class="max-w-[92rem] mx-auto px-6 pt-36 pb-20">
    <h1 class="text-5xl mb-4">BPR 12 Elements Focus</h1>
    <p class="text-slate-300 text-lg mb-10 max-w-3xl leading-relaxed">
        Vaste beoordeling van 12 elementen. In <strong>advanced</strong> wordt
        de score berekend als product van gewogen impact, tijdskritisch en
        onzekerheid. In
        <strong>simple</strong> gebruik je alleen inschatting.
    </p>

    <section class="mb-10">
        <div
            class="inline-flex p-1 bg-slate-800/70 border border-teal-500/30 rounded-lg"
        >
            <button
                type="button"
                onclick={() => (mode = "simple")}
                class="px-4 py-2 rounded-md text-sm transition-colors cursor-pointer {mode ===
                'simple'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700/80'}"
            >
                Simple
            </button>
            <button
                type="button"
                onclick={() => (mode = "advanced")}
                class="px-4 py-2 rounded-md text-sm transition-colors cursor-pointer {mode ===
                'advanced'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700/80'}"
            >
                Advanced
            </button>
        </div>
    </section>

    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Gewichten
        </h2>

        {#if mode === "advanced"}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {#each ADVANCED_FIELDS as field}
                    <div
                        class="bg-slate-800/50 border border-teal-500/20 rounded-lg p-4 flex flex-col min-h-[150px]"
                    >
                        <label
                            for="weight-{field.key}"
                            class="block text-sm text-teal-300/80 mb-2"
                        >
                            {field.label}
                        </label>
                        <input
                            id="weight-{field.key}"
                            type="number"
                            bind:value={weights[field.key]}
                            min="0"
                            step="0.5"
                            class="mt-auto w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                        />
                    </div>
                {/each}
            </div>
        {:else}
            <div class="max-w-sm">
                <div
                    class="bg-slate-800/50 border border-teal-500/20 rounded-lg p-4 flex flex-col min-h-[150px]"
                >
                    <label
                        for="weight-inschatting"
                        class="block text-sm text-teal-300/80 mb-2"
                    >
                        Inschatting
                    </label>
                    <input
                        id="weight-inschatting"
                        type="number"
                        bind:value={weights.inschatting}
                        min="0"
                        step="0.5"
                        class="mt-auto w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                    />
                </div>
            </div>
        {/if}
    </section>

    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Invoer
        </h2>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse min-w-[980px]">
                <colgroup>
                    <col style="width: 1%" />
                    {#if mode === "advanced"}
                        <col style="width: 1%" />
                        <col style="width: 1%" />
                        <col style="width: 1%" />
                    {:else}
                        <col style="width: 1%" />
                    {/if}
                    <col />
                </colgroup>
                <thead>
                    <tr class="bg-slate-800/80">
                        <th
                            class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                            >Element</th
                        >
                        {#if mode === "advanced"}
                            {#each ADVANCED_FIELDS as field}
                                <th
                                    class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                                >
                                    {field.label}
                                </th>
                            {/each}
                        {:else}
                            <th
                                class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                            >
                                Inschatting
                            </th>
                        {/if}
                        <th
                            class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30"
                            >Notities</th
                        >
                    </tr>
                </thead>
                <tbody>
                    {#each rows as row}
                        <tr
                            class="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                        >
                            <td
                                class="p-2 text-slate-200 align-bottom whitespace-nowrap"
                            >
                                {row.element}
                            </td>
                            {#if mode === "advanced"}
                                <td class="p-2 align-bottom">
                                    <input
                                        type="number"
                                        bind:value={row.impact}
                                        min={MIN_SCORE}
                                        max={MAX_SCORE}
                                        step="1"
                                        onblur={() =>
                                            (row.impact = clampScore(
                                                Math.round(row.impact),
                                            ))}
                                        class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                                    />
                                </td>
                                <td class="p-2 align-bottom">
                                    <input
                                        type="number"
                                        bind:value={row.tijdskritisch}
                                        min={MIN_SCORE}
                                        max={MAX_SCORE}
                                        step="1"
                                        onblur={() =>
                                            (row.tijdskritisch = clampScore(
                                                Math.round(row.tijdskritisch),
                                            ))}
                                        class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                                    />
                                </td>
                                <td class="p-2 align-bottom">
                                    <input
                                        type="number"
                                        bind:value={row.onzekerheid}
                                        min={MIN_SCORE}
                                        max={MAX_SCORE}
                                        step="1"
                                        onblur={() =>
                                            (row.onzekerheid = clampScore(
                                                Math.round(row.onzekerheid),
                                            ))}
                                        class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                                    />
                                </td>
                            {:else}
                                <td class="p-2 align-bottom">
                                    <input
                                        type="number"
                                        bind:value={row.inschatting}
                                        min={MIN_SCORE}
                                        max={MAX_SCORE}
                                        step="1"
                                        onblur={() =>
                                            (row.inschatting = clampScore(
                                                Math.round(row.inschatting),
                                            ))}
                                        class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                                    />
                                </td>
                            {/if}
                            <td class="p-2 align-bottom">
                                <textarea
                                    bind:value={row.note}
                                    rows="2"
                                    placeholder="Waarom is deze waarde gekozen?"
                                    class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-teal-500/60 focus:outline-none min-h-[84px]"
                                ></textarea>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section>
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Resultaten
        </h2>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse min-w-[980px]">
                <colgroup>
                    <col style="width: 1%" />
                    <col style="width: 1%" />
                    <col style="width: 1%" />
                    {#if mode === "advanced"}
                        <col style="width: 1%" />
                        <col style="width: 1%" />
                        <col style="width: 1%" />
                    {:else}
                        <col style="width: 1%" />
                    {/if}
                    <col />
                </colgroup>
                <thead>
                    <tr class="bg-slate-800/80">
                        <th
                            class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                            >#</th
                        >
                        <th
                            class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                            >Element</th
                        >
                        <th
                            class="text-right p-2 text-teal-300/80 font-bold border-b border-teal-500/30 whitespace-nowrap"
                            >Focus score</th
                        >
                        {#if mode === "advanced"}
                            {#each ADVANCED_FIELDS as field}
                                <th
                                    class="text-right p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                                >
                                    {field.label}
                                </th>
                            {/each}
                        {:else}
                            <th
                                class="text-right p-2 text-teal-300/80 font-medium border-b border-teal-500/30 whitespace-nowrap"
                            >
                                Inschatting
                            </th>
                        {/if}
                        <th
                            class="text-left p-2 text-teal-300/80 font-medium border-b border-teal-500/30"
                            >Notities</th
                        >
                    </tr>
                    <tr class="bg-slate-800/40">
                        <td class="p-2"></td>
                        <td class="p-2"></td>
                        <td class="p-2 text-xs text-slate-500 italic"
                            >Gewicht</td
                        >
                        {#if mode === "advanced"}
                            {#each ADVANCED_FIELDS as field}
                                <td
                                    class="p-2 text-right text-xs text-slate-500 italic"
                                    >{weights[field.key]}</td
                                >
                            {/each}
                        {:else}
                            <td
                                class="p-2 text-right text-xs text-slate-500 italic"
                                >{weights.inschatting}</td
                            >
                        {/if}
                        <td class="p-2"></td>
                    </tr>
                </thead>
                <tbody>
                    {#each results as result, index}
                        <tr
                            class="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                        >
                            <td class="p-2 text-slate-500">{index + 1}</td>
                            <td
                                class="p-2 text-slate-200 font-normal whitespace-nowrap"
                                >{result.element}</td
                            >
                            <td class="p-2 text-right">
                                <span
                                    class="inline-block min-w-[92px] text-center px-3 py-1 rounded-md border border-teal-500/40 font-bold font-mono {scoreColor(
                                        result.score,
                                    )}"
                                >
                                    {result.score.toFixed(2)}
                                </span>
                            </td>
                            {#if mode === "advanced"}
                                <td
                                    class="p-2 text-right font-normal font-mono text-slate-300"
                                    >{result.values.impact.toFixed(2)}</td
                                >
                                <td
                                    class="p-2 text-right font-normal font-mono text-slate-300"
                                    >{result.values.tijdskritisch.toFixed(
                                        2,
                                    )}</td
                                >
                                <td
                                    class="p-2 text-right font-normal font-mono text-slate-300"
                                    >{result.values.onzekerheid.toFixed(2)}</td
                                >
                            {:else}
                                <td
                                    class="p-2 text-right font-normal font-mono text-slate-300"
                                    >{result.simple.toFixed(2)}</td
                                >
                            {/if}
                            <td
                                class="p-2 text-slate-300 font-normal whitespace-pre-wrap break-words"
                                >{result.note}</td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <ElementImportanceCloud
        items={results.map((result) => ({
            element: result.element,
            score: result.score,
        }))}
    />
</div>

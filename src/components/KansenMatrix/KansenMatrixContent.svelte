<script lang="ts">
    import { onMount } from "svelte";

    const CATEGORIES = [
        { key: "commercieel", label: "Commerciële waarde" },
        {
            key: "groei",
            label: "Groeipotentieel",
            subtitle:
                "mogelijkheden tot verlenging, scope vergroting of inzet ander personeel BPR",
        },
        {
            key: "strategisch",
            label: "Strategisch belang",
            subtitle: "complexe projecten, juiste expertise, goede pipeline",
        },
        {
            key: "relatie",
            label: "Relatie",
            subtitle: "betrouwbaarheid, gemak van contact",
        },
        {
            key: "capaciteit",
            label: "Capaciteitsplanning",
            subtitle: "wanneer en wie",
        },
    ] as const;

    type CategoryKey = (typeof CATEGORIES)[number]["key"];

    interface Row {
        naam: string;
        scores: Record<CategoryKey, number>;
    }

    const SCORE_OPTIONS = [-2, -1, 0, 1, 2];

    let rows = $state<Row[]>([]);
    let weights = $state<Record<CategoryKey, number>>({
        commercieel: 1,
        groei: 1,
        strategisch: 1,
        relatie: 1,
        capaciteit: 1,
    });
    let initialized = $state(false);
    let copyFeedback = $state(false);

    let results = $derived.by(() => {
        return rows
            .filter((r) => r.naam.trim() !== "")
            .map((r) => {
                const weighted: Record<string, number> = {};
                let total = 0;
                for (const cat of CATEGORIES) {
                    const val = r.scores[cat.key] * weights[cat.key];
                    weighted[cat.key] = val;
                    total += val;
                }
                return { naam: r.naam, weighted, total };
            })
            .sort((a, b) => b.total - a.total);
    });

    function defaultScores(): Record<CategoryKey, number> {
        return {
            commercieel: 0,
            groei: 0,
            strategisch: 0,
            relatie: 0,
            capaciteit: 0,
        };
    }

    function addRow() {
        rows.push({ naam: "", scores: defaultScores() });
    }

    function deleteRow(index: number) {
        rows.splice(index, 1);
    }

    function encodeState(): string {
        const compact = {
            r: rows.map((r) => [
                r.naam,
                ...CATEGORIES.map((c) => r.scores[c.key]),
            ]),
            w: CATEGORIES.map((c) => weights[c.key]),
        };
        return btoa(JSON.stringify(compact));
    }

    function decodeState(encoded: string) {
        try {
            const compact = JSON.parse(atob(encoded));
            if (compact.w) {
                CATEGORIES.forEach((c, i) => {
                    weights[c.key] = compact.w[i] ?? 1;
                });
            }
            if (compact.r) {
                rows = compact.r.map((arr: (string | number)[]) => {
                    const scores = defaultScores();
                    CATEGORIES.forEach((c, i) => {
                        scores[c.key] = (arr[i + 1] as number) ?? 0;
                    });
                    return { naam: (arr[0] as string) || "", scores };
                });
            }
        } catch (e) {
            console.error("Failed to decode kansenmatrix state:", e);
        }
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get("data");
        if (data) {
            decodeState(data);
        }
        initialized = true;
    });

    let syncTimer: ReturnType<typeof setTimeout> | undefined;

    $effect(() => {
        // Track deep changes
        JSON.stringify(rows);
        JSON.stringify(weights);

        if (!initialized) return;

        clearTimeout(syncTimer);
        syncTimer = setTimeout(() => {
            const url = new URL(window.location.href);
            if (rows.length > 0) {
                url.searchParams.set("data", encodeState());
            } else {
                url.searchParams.delete("data");
            }
            window.history.replaceState({}, "", url.toString());
        }, 300);
    });

    function scoreColor(val: number): string {
        if (val > 0) return "text-teal-400";
        if (val < 0) return "text-red-400";
        return "text-slate-500";
    }

    function copyMarkdown() {
        if (results.length === 0) return;

        const catHeaders = CATEGORIES.map((c) => c.label).join(" | ");
        const header = `| # | Naam kans | ${catHeaders} | Totaal |`;
        const sep = `|---|-----------|${CATEGORIES.map(() => "---").join("|")}|--------|`;
        const weightRow = `| | *Gewicht* | ${CATEGORIES.map((c) => `*${weights[c.key]}*`).join(" | ")} | |`;

        const dataRows = results.map((r, i) => {
            const scores = CATEGORIES.map(
                (c) => r.weighted[c.key].toString(),
            ).join(" | ");
            return `| ${i + 1} | ${r.naam} | ${scores} | **${r.total}** |`;
        });

        const md = [header, sep, weightRow, ...dataRows].join("\n");
        navigator.clipboard.writeText(md);
        copyFeedback = true;
        setTimeout(() => (copyFeedback = false), 1500);
    }
</script>

<div class="max-w-6xl mx-auto px-6 pt-36 pb-20">
    <h1 class="text-5xl mb-4">Kansenmatrix BPR</h1>
    <p class="text-slate-300 text-lg mb-16 max-w-2xl leading-relaxed">
        Multi-criteria analyse voor het prioriteren van kansen. Scores lopen van
        -2 (zeer negatief) tot +2 (zeer positief). Gewichten bepalen het
        relatieve belang per criterium.
    </p>

    <!-- Gewichten -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Gewichten
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {#each CATEGORIES as cat}
                <div
                    class="bg-slate-800/50 border border-teal-500/20 rounded-lg p-4"
                >
                    <label
                        for="weight-{cat.key}"
                        class="block text-sm text-teal-300/80 mb-1"
                        >{cat.label}</label
                    >
                    {#if cat.subtitle}
                        <p class="text-xs text-slate-500 mb-2">
                            {cat.subtitle}
                        </p>
                    {/if}
                    <input
                        id="weight-{cat.key}"
                        type="number"
                        bind:value={weights[cat.key]}
                        min="0"
                        step="0.5"
                        class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none"
                    />
                </div>
            {/each}
        </div>
    </section>

    <!-- Kansen input table -->
    <section class="mb-16">
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-3xl flex items-center gap-3">
                <span class="text-teal-500/80">&#47;&#47;</span> Kansen
            </h2>
            <button
                onclick={addRow}
                class="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
                + Nieuwe kans
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse">
                <thead>
                    <tr class="bg-slate-800/80">
                        <th
                            class="text-left p-3 text-teal-300/80 font-medium border-b border-teal-500/30"
                            >Naam kans</th
                        >
                        {#each CATEGORIES as cat}
                            <th
                                class="text-left p-3 text-teal-300/80 font-medium border-b border-teal-500/30 min-w-[130px]"
                            >
                                {cat.label}
                            </th>
                        {/each}
                        <th
                            class="p-3 border-b border-teal-500/30 w-12"
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {#each rows as row, i}
                        <tr
                            class="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                        >
                            <td class="p-2">
                                <input
                                    type="text"
                                    bind:value={row.naam}
                                    placeholder="Naam van de kans..."
                                    class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 placeholder:text-slate-600 focus:border-teal-500/60 focus:outline-none min-w-[200px]"
                                />
                            </td>
                            {#each CATEGORIES as cat}
                                <td class="p-2">
                                    <select
                                        value={row.scores[cat.key]}
                                        onchange={(e) => {
                                            row.scores[cat.key] = Number(
                                                e.currentTarget.value,
                                            );
                                        }}
                                        class="w-full bg-slate-900/60 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:border-teal-500/60 focus:outline-none cursor-pointer"
                                    >
                                        {#each SCORE_OPTIONS as score}
                                            <option value={score}
                                                >{score > 0
                                                    ? `+${score}`
                                                    : score}</option
                                            >
                                        {/each}
                                    </select>
                                </td>
                            {/each}
                            <td class="p-2 text-center">
                                <button
                                    onclick={() => deleteRow(i)}
                                    class="text-red-400/60 hover:text-red-400 transition-colors cursor-pointer text-lg"
                                    title="Verwijder"
                                >
                                    &times;
                                </button>
                            </td>
                        </tr>
                    {/each}
                    {#if rows.length === 0}
                        <tr>
                            <td
                                colspan={CATEGORIES.length + 2}
                                class="p-8 text-center text-slate-500"
                            >
                                Geen kansen toegevoegd. Klik op "Nieuwe kans" om
                                te beginnen.
                            </td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        </div>
    </section>

    <!-- Resultaten -->
    {#if results.length > 0}
        <section class="mb-16">
            <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl flex items-center gap-3">
                    <span class="text-teal-500/80">&#47;&#47;</span> Resultaten
                </h2>
                <button
                    onclick={copyMarkdown}
                    class="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                    {copyFeedback ? "Gekopieerd!" : "Kopieer als markdown"}
                </button>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-800/80">
                            <th
                                class="text-left p-3 text-teal-300/80 font-medium border-b border-teal-500/30 w-12"
                                >#</th
                            >
                            <th
                                class="text-left p-3 text-teal-300/80 font-medium border-b border-teal-500/30"
                                >Naam kans</th
                            >
                            {#each CATEGORIES as cat}
                                <th
                                    class="text-right p-3 text-teal-300/80 font-medium border-b border-teal-500/30"
                                >
                                    {cat.label}
                                </th>
                            {/each}
                            <th
                                class="text-right p-3 text-teal-300/80 font-bold border-b border-teal-500/30"
                                >Totaal</th
                            >
                        </tr>
                        <tr class="bg-slate-800/40">
                            <td class="p-2"></td>
                            <td
                                class="p-2 text-xs text-slate-500 italic"
                                >Gewicht</td
                            >
                            {#each CATEGORIES as cat}
                                <td
                                    class="p-2 text-right text-xs text-slate-500 italic"
                                    >{weights[cat.key]}</td
                                >
                            {/each}
                            <td class="p-2"></td>
                        </tr>
                    </thead>
                    <tbody>
                        {#each results as result, i}
                            <tr
                                class="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                            >
                                <td class="p-3 text-slate-500">{i + 1}</td>
                                <td class="p-3 text-slate-200"
                                    >{result.naam}</td
                                >
                                {#each CATEGORIES as cat}
                                    <td
                                        class="p-3 text-right font-mono {scoreColor(result.weighted[cat.key])}"
                                    >
                                        {result.weighted[cat.key]}
                                    </td>
                                {/each}
                                <td
                                    class="p-3 text-right font-bold font-mono {scoreColor(result.total)}"
                                >
                                    {result.total}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
    {/if}
</div>

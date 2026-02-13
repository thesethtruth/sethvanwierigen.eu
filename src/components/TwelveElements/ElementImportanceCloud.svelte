<script lang="ts">
    import {
        buildImportanceCloud,
        type ImportanceInput,
    } from "./importanceCloud";

    let { items = [] } = $props<{ items?: ImportanceInput[] }>();

    let cloudItems = $derived(buildImportanceCloud(items));
</script>

<section class="mt-16">
    <h2 class="text-3xl mb-3 flex items-center gap-3">
        <span class="text-teal-500/80">&#47;&#47;</span> Relatieve belangrijkheid
    </h2>
    <p class="text-slate-400 text-sm mb-6">
        Grootte geeft relatieve belangrijkheid op basis van de berekende focus
        score.
    </p>

    <div
        class="rounded-xl border border-teal-500/20 bg-slate-800/30 p-6 md:p-8 overflow-hidden"
    >
        <div class="flex flex-wrap items-center gap-x-5 gap-y-4 leading-none">
            {#each cloudItems as item}
                <div
                    class="text-teal-200 font-semibold select-none whitespace-nowrap"
                    style="font-size: {item.sizePx}px; opacity: {item.alpha}; transform: rotate({item.tiltDeg}deg);"
                    title={`#${item.rank} · ${item.score.toFixed(2)}`}
                >
                    {item.element}
                </div>
            {/each}
        </div>
    </div>
</section>

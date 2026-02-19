<script lang="ts">
    import { Dices, Download } from "@lucide/svelte";
    import { onMount } from "svelte";
    import {
        buildImportanceCloudLayout,
        type ImportanceCloudWord,
        type ImportanceInput,
    } from "./importanceCloud";

    let { items = [] } = $props<{ items?: ImportanceInput[] }>();
    let cloudWords = $state<ImportanceCloudWord[]>([]);
    let cloudWidth = $state(880);
    let cloudHeight = 420;
    let isRendering = $state(false);
    let renderError = $state("");

    let containerEl: HTMLDivElement | null = null;
    let renderSeq = 0;
    let mounted = false;
    let resizeObserver: ResizeObserver | null = null;
    let layoutSeed = $state(Date.now());

    async function renderCloud() {
        if (!containerEl) return;
        const width = Math.max(280, Math.floor(containerEl.clientWidth));

        cloudWidth = width;
        renderError = "";
        const seq = ++renderSeq;

        if (items.length === 0) {
            cloudWords = [];
            return;
        }

        isRendering = true;

        try {
            const words = await buildImportanceCloudLayout(
                items,
                cloudWidth,
                cloudHeight,
                {
                    padding: 1,
                    seed: layoutSeed,
                },
            );
            if (seq === renderSeq) {
                cloudWords = words;
            }
        } catch (error) {
            if (seq === renderSeq) {
                cloudWords = [];
                renderError =
                    error instanceof Error
                        ? error.message
                        : "Kon de word cloud niet tekenen.";
            }
        } finally {
            if (seq === renderSeq) {
                isRendering = false;
            }
        }
    }

    function downloadCloudPng() {
        if (cloudWords.length === 0) return;

        const exportMargin = 24;
        const exportTargetWidth = 1200;
        const measureCanvas = document.createElement("canvas");
        const measureContext = measureCanvas.getContext("2d");
        if (!measureContext) return;

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (const word of cloudWords) {
            measureContext.font = `600 ${Math.round(word.size)}px Arial`;
            const metrics = measureContext.measureText(word.text);
            const wordWidth = metrics.width;
            const ascent =
                metrics.actualBoundingBoxAscent || Math.round(word.size * 0.8);
            const descent =
                metrics.actualBoundingBoxDescent || Math.round(word.size * 0.2);

            const centerX = cloudWidth / 2 + word.x;
            const centerY = cloudHeight / 2 + word.y;

            const left = centerX - wordWidth / 2;
            const right = centerX + wordWidth / 2;
            const top = centerY - ascent;
            const bottom = centerY + descent;

            minX = Math.min(minX, left);
            minY = Math.min(minY, top);
            maxX = Math.max(maxX, right);
            maxY = Math.max(maxY, bottom);
        }

        if (!Number.isFinite(minX) || !Number.isFinite(minY)) return;

        const contentWidth = Math.max(1, Math.ceil(maxX - minX));
        const contentHeight = Math.max(1, Math.ceil(maxY - minY));
        const baseWidth = contentWidth + exportMargin * 2;
        const baseHeight = contentHeight + exportMargin * 2;
        const exportScale = exportTargetWidth / baseWidth;
        const exportWidth = exportTargetWidth;
        const exportHeight = Math.max(1, Math.round(baseHeight * exportScale));

        const ratio = Math.max(2, Math.ceil(window.devicePixelRatio || 1));
        const canvas = document.createElement("canvas");
        canvas.width = exportWidth * ratio;
        canvas.height = exportHeight * ratio;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.scale(ratio, ratio);
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, exportWidth, exportHeight);
        context.scale(exportScale, exportScale);
        context.textAlign = "center";
        context.textBaseline = "middle";

        for (const word of cloudWords) {
            context.save();
            const x = cloudWidth / 2 + word.x - minX + exportMargin;
            const y = cloudHeight / 2 + word.y - minY + exportMargin;
            context.translate(x, y);
            context.rotate(0);
            context.fillStyle = word.color;
            context.font = `600 ${Math.round(word.size)}px Arial`;
            context.fillText(word.text, 0, 0);
            context.restore();
        }

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "bpr-12-elements-word-cloud.png";
        link.click();
    }

    function rerollCloud() {
        layoutSeed = Date.now() + Math.floor(Math.random() * 100000);
    }

    onMount(() => {
        mounted = true;
        resizeObserver = new ResizeObserver(() => {
            void renderCloud();
        });
        if (containerEl) {
            resizeObserver.observe(containerEl);
        }
        void renderCloud();

        return () => {
            mounted = false;
            resizeObserver?.disconnect();
        };
    });

    $effect(() => {
        items;
        layoutSeed;
        if (!mounted) return;
        void renderCloud();
    });
</script>

<section class="mt-16">
    <div class="flex items-end justify-between gap-4 flex-wrap mb-3">
        <h2 class="text-3xl flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Relatieve belangrijkheid
        </h2>
        <div class="flex items-center gap-2">
            <button
                type="button"
                onclick={rerollCloud}
                disabled={isRendering || items.length === 0}
                class="flex flex-row px-3 py-2 rounded-md text-sm border border-slate-500/40 bg-slate-900/50 text-slate-200 hover:bg-slate-800/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <Dices class="w-4 h-4 mr-2" /> Opnieuw genereren
            </button>
            <button
                type="button"
                onclick={downloadCloudPng}
                disabled={cloudWords.length === 0 || isRendering}
                class="flex flex-row px-3 py-2 rounded-md text-sm border border-teal-500/40 bg-slate-900/50 text-teal-200 hover:bg-slate-800/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <Download class="w-4 h-4 mr-2" /> Download als afbeelding (PNG)
            </button>
        </div>
    </div>
    <p class="text-slate-400 text-sm mb-6">
        Grootte geeft relatieve belangrijkheid op basis van de berekende focus
        score. Alle woorden blijven horizontaal.
    </p>

    <div
        bind:this={containerEl}
        class="rounded-xl border border-teal-500/20 bg-white p-4 md:p-6 overflow-hidden"
    >
        {#if renderError}
            <p class="text-red-700 text-sm">{renderError}</p>
        {:else if cloudWords.length === 0 && !isRendering}
            <p class="text-slate-700 text-sm">
                Nog geen data beschikbaar voor de word cloud.
            </p>
        {:else}
            <svg
                width="100%"
                viewBox={`0 0 ${cloudWidth} ${cloudHeight}`}
                role="img"
                aria-label="Word cloud van 12 elementen"
            >
                <rect
                    x="0"
                    y="0"
                    width={cloudWidth}
                    height={cloudHeight}
                    fill="#ffffff"
                />
                <g
                    transform={`translate(${cloudWidth / 2}, ${cloudHeight / 2})`}
                >
                    {#each cloudWords as word}
                        <text
                            x={word.x}
                            y={word.y}
                            text-anchor="middle"
                            dominant-baseline="middle"
                            fill={word.color}
                            font-size={word.size}
                            font-family="Arial"
                            font-weight="600"
                            transform={`rotate(0, ${word.x}, ${word.y})`}
                            style="user-select: none;"
                            title={`${word.text} · ${word.score.toFixed(2)}`}
                        >
                            {word.text}
                        </text>
                    {/each}
                </g>
            </svg>
        {/if}
    </div>
</section>

<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";

    export let title: string;
    export let role: string;
    export let description: string;
    export let tags: string[];
    export let period: string = "";
    export let link: string = "";
</script>

<div
    class="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-slate-800/60"
>
    <div class="flex flex-col gap-3">
        <div class="flex items-start justify-between gap-4">
            <div>
                <h3 class="text-xl">
                    {#if link}
                        <a href={link} target="_blank" class="link">{title}</a>
                    {:else}
                        {title}
                    {/if}
                </h3>
                <p class="text-sm text-teal-300/60 mt-1">{role}</p>
            </div>
            {#if period}
                <span class="text-sm text-slate-500 shrink-0">{period}</span>
            {/if}
        </div>
        <p class="text-slate-300 leading-relaxed">{description}</p>
        <div class="flex flex-wrap gap-2 mt-1">
            {#each tags as tag}
                <Badge
                    class="bg-teal-500/10 text-teal-300/80 border-teal-500/20 hover:bg-teal-500/20 text-xs"
                >
                    {tag}
                </Badge>
            {/each}
        </div>
    </div>
</div>

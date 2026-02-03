<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { ExternalLink } from "@lucide/svelte";

    export let title: string;
    export let role: string;
    export let description: string;
    export let tags: string[];
    export let period: string = "";
    export let link: string = "";
</script>

<div
    class="group border-l-2 border-teal-500/30 pl-6 hover:border-teal-500/60 transition-colors duration-300"
>
    <div class="flex flex-col gap-2">
        <div class="flex items-start justify-between gap-2">
            <div>
                <h3 class="text-xl">
                    {#if link}
                        <a
                            href={link}
                            target="_blank"
                            class="link flex flex-row items-center gap-2"
                            >{title}<ExternalLink
                                size="20"
                                class="h-fit w-fit"
                            /></a
                        >
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
                <Badge variant="teal">
                    {tag}
                </Badge>
            {/each}
        </div>
    </div>
</div>

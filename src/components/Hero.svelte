<script>
    import Seth from "../assets/seth.jpg";
    import HeroAbout from "./HeroAbout.svelte";
    import HeroItem from "./HeroItem.svelte";
    import HeroSocials from "./HeroSocials.svelte";

    let heroItems = [
        {
            title: "consulting engineer.",
            target: "/projects#consulting",
        },
        {
            title: "energy nerd.",
            target: "/about",
        },
        {
            title: "developer.",
            target: "/projects#tooling",
        },
        // {
        //     title: "data&ai",
        //     target: "/projects#data-ai",
        // },
    ];
</script>

<div
    class="flex flex-col items-center justify-center pt-2 mt-32 mb-20 max-w-3xl text-center"
>
    <div class="flex gap-x-2">
        <!-- Seth image -->
        <div class=" h-48 w-48 overflow-hidden rounded-full drop-shadow-lg">
            <img
                src={Seth.src}
                alt="Seth van Wieringen"
                class="absolute w-full h-full object-cover"
            />
        </div>
        <!-- Moving shadow -->
        <div
            class=" h-48 w-48 -z-10 rounded-full bg-teal-500/70 absolute -translate-x-2 -translate-y-1"
        ></div>

        <!-- Key skills -->
        <div
            class=" text-teal-100/80 my-auto space-y-0.5 text-4xl text-left w-fit"
        >
            {#each heroItems as item}
                <HeroItem title={item.title} target={item.target} />
            {/each}
        </div>
    </div>
    <div class="">
        <HeroAbout />
        <HeroSocials />
    </div>
</div>

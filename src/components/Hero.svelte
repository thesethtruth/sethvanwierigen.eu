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

<div class="flex items-center justify-center mt-40 pb-20 mb-20">
    <div class="grid grid-cols-2 gap-x-5 text-center max-w-4xl">
        <div
            class="h-48 w-48 ml-auto overflow-hidden rounded-full drop-shadow-lg"
        >
            <img
                src={Seth.src}
                alt="Seth van Wieringen"
                class="absolute w-full h-full object-cover"
            />
        </div>
        <div
            class="h-48 w-48 ml-auto rounded-full bg-teal-500/70 absolute"
        ></div>

        <div class="text-teal-100 my-auto space-y-0.5 text-4xl text-left">
            {#each heroItems as item}
                <HeroItem title={item.title} target={item.target} />
            {/each}
        </div>

        <div class="col-span-2">
            <HeroAbout />
            <HeroSocials />
        </div>
    </div>
</div>

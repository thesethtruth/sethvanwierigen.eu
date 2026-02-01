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

    let mouseX = $state(0);
    let mouseY = $state(0);
    let windowWidth = $state(1);
    let windowHeight = $state(1);

    let centerX = $derived(windowWidth / 2);
    let centerY = $derived(windowHeight / 2);
    let offsetX = $derived((mouseX - centerX) / windowWidth);
    let offsetY = $derived((mouseY - centerY) / windowHeight);

    $effect(() => {
        // Initialize after mount (window exists)
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        function handleMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        function handleResize() {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        // Cleanup returned from $effect
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    });
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
            class="h-50 w-50 -z-10 rounded-full bg-teal-500/70 absolute"
            style="transform: translate({-0.5 + offsetX}em, {-0.25 +
                offsetY}em)"
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

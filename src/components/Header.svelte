<script lang="ts">
    const links = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/about", label: "About" },
    ];

    import Button from "$lib/components/ui/button/button.svelte";

    export let currentPath: string;
    const isActive = (path: string) =>
        path === "/" ? currentPath === "/" : currentPath.startsWith(path);

    let open = false;

    function toggleMenu() {
        console.log("toggling menu");
        open = !open;
    }
</script>

<header class="px-12 py-10 bg-slate-900/50 absolute w-full top-0 left-0 z-50">
    <nav class="flex items-center justify-between">
        <a href="/" class="text-4xl text-slate-50/90 font-josefin tracking-wide"
            >Seth <span class="hidden md:inline">van Wieringen</span></a
        >

        <div class="gap-8 text-xl hidden sm:flex">
            {#each links as { href, label }}
                <a
                    {href}
                    class="{isActive(href)
                        ? 'text-teal-300/80 font-semibold'
                        : ''} hover:text-teal-300/80">{label}</a
                >
            {/each}
        </div>

        <div class="flex sm:hidden items-center justify-center">
            <button
                onclick={toggleMenu}
                class="flex flex-col gap-1.5 justify-center items-center"
                aria-label="Menu Button"
            >
                <span class="w-8 h-0.5 bg-slate-50/90 rounded"></span>
                <span class="w-8 h-0.5 bg-slate-50/90 rounded"></span>
                <span class="w-8 h-0.5 bg-slate-50/90 rounded"></span>
            </button>
        </div>
        <div
            class="absolute top-full left-0 w-full bg-slate-900/95 flex flex-col items-center gap-6 py-6 sm:hidden transition-all duration-600 ease-in-out overflow-hidden -z-1 text-2xl"
            class:min-h-screen={open}
            class:-translate-y-96={!open}
            class:pointer-events-none={!open}
        >
            {#each links as { href, label }}
                <a
                    {href}
                    class="{isActive(href)
                        ? 'text-teal-300/80 font-semibold'
                        : ''} hover:text-teal-300/80">{label}</a
                >
            {/each}
        </div>
    </nav>
</header>

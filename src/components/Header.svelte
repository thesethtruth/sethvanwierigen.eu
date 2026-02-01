<script lang="ts">
    const name = "Seth van Wieringen";
    const links = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    export let currentPath: string;
    const isActive = (path: string) =>
        path === "/" ? currentPath === "/" : currentPath.startsWith(path);
</script>

<header class="px-12 py-10 bg-slate-900/50 absolute w-full top-0 left-0 z-50">
    <nav class="flex items-center justify-between">
        <a href="/" class="text-4xl text-slate-50/90 font-josefin tracking-wide"
            >{name}</a
        >
        <div class="flex gap-8 text-xl">
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

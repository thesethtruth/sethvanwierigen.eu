<script>
    const name = "Seth van Wieringen";
    const links = [
        { href: "/", label: "Home" },
        { href: "/academic", label: "Academic" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];
</script>

<header class="border-b border-gray-200 px-8 py-4">
    <nav class="flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-gray-900">{name}</a>
        <div class="flex gap-8">
            {#each links as { href, label }}
                <a {href} class="text-gray-600 hover:text-gray-900">{label}</a>
            {/each}
        </div>
    </nav>
</header>

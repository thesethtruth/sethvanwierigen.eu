<script>
    export let title;
    export let target;
</script>

<a href={target} class="flex items-center">
    <p
        class="group flex justify-left hover:translate-x-5 hover:text-teal-300/80 transition-all transform-content duration-400 ease-in-out hover:border-b-2 hover:border-teal-500 cursor-pointer border-b-2 border-transparent pb-2"
    >
        <span
            class="group-hover:opacity-100 opacity-0 pr-5 -translate-x-10 text-teal-300/80 group-hover:border-transparent group-hover:translate-x-0 transition-all duration-400 ease-in-out font-bold self-center -translate-y-1"
            >⟶</span
        >
        {title}
    </p>
</a>

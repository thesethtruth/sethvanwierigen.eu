<script>
    export let title;
    export let target;
</script>

<a href={target}>
    <p
        class="group flex justify-left hover:translate-x-5 hover:text-teal-200 transition-all transform-content duration-400 ease-in-out hover:border-b-2 hover:border-teal-500 cursor-pointer border-b-2 border-transparent pb-2"
    >
        <span
            class="group-hover:opacity-100 opacity-0 pr-5 -translate-x-10 text-teal-200 group-hover:border-transparent group-hover:translate-x-0 transition-all duration-400 ease-in-out font-bold pb-1"
            >⟶</span
        >
        {title}
    </p>
</a>

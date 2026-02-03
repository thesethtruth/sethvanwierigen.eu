<script lang="ts">
    export let role: string;
    export let organization: string;
    export let description: string;
    export let link: string;
</script>

<p class="text-slate-300 leading-relaxed mt-5">
    {role} at <a class="link" href={link}>{organization}</a>
    <br />
    <span class="italic font-light text-slate-200/80 text-sm">
        {description}
    </span>
</p>

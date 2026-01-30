<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { FileUser, Mail, Github, Linkedin } from "@lucide/svelte";
</script>

<div class="inline-flex flex-row items-center gap-6 h-10 my-6" id="social-bar">
    <!-- CV -->
    <Button
        size="icon-lg"
        href="/Seth-van-Wieringen-CV.pdf"
        target="_blank"
        class="group hover:size-16 transition-all duration-400 ease-in-out"
    >
        <FileUser
            strokeWidth="1.5"
            class="mx-2 size-9 group-hover:size-12 duration-100 ease-in-out stroke-teal-500 drop-shadow-lg"
        />
    </Button>

    <!-- Mail -->
    <Button
        size="icon-lg"
        href="mailto:hi@sethvanwieringen.eu"
        target="_blank"
        class="group hover:size-16 transition-all duration-400 ease-in-out"
    >
        <Mail
            strokeWidth="1.5"
            class="mx-2 size-9 group-hover:size-12 duration-100 ease-in-out stroke-teal-500 drop-shadow-lg"
        />
    </Button>

    <!-- GitHub -->
    <Button
        size="icon-lg"
        href="https://github.com/thesethtruth"
        target="_blank"
        class="group hover:size-16 transition-all duration-400 ease-in-out"
    >
        <Github
            strokeWidth="1.5"
            class="mx-2 size-9 group-hover:size-12 duration-100 ease-in-out stroke-teal-500 drop-shadow-lg"
        />
    </Button>

    <!-- LinkedIn -->
    <Button
        size="icon-lg"
        href="https://www.linkedin.com/in/seth-van-wieringen/"
        target="_blank"
        class="group hover:size-16 transition-all duration-400 ease-in-out"
    >
        <Linkedin
            strokeWidth="1.5"
            class="mx-2 size-9 group-hover:size-12 duration-100 ease-in-out stroke-teal-500 drop-shadow-lg"
        />
    </Button>
</div>

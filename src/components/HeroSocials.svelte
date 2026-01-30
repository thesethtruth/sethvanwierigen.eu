<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { FileUser, Mail, Github, Linkedin } from "@lucide/svelte";
</script>

<div class="inline-flex flex-row items-center gap-6 h-10" id="social-bar">
    <!-- CV -->
    <Button size="icon-lg" href="/Seth-van-Wieringen-CV.pdf" target="_blank">
        <FileUser
            strokeWidth="1"
            class="mx-2 size-9 stroke-teal-500 drop-shadow-lg"
        />
    </Button>

    <!-- Mail -->
    <Button size="icon-lg" href="mailto:hi@sethvanwieringen.eu" target="_blank">
        <Mail
            strokeWidth="1"
            class="mx-2 size-9 stroke-teal-500 drop-shadow-lg"
        />
    </Button>

    <!-- GitHub -->
    <Button
        size="icon-lg"
        href="https://github.com/thesethtruth"
        target="_blank"
    >
        <Github
            strokeWidth="1"
            class="mx-2 size-9 stroke-teal-500 drop-shadow-lg"
        />
    </Button>

    <!-- LinkedIn -->
    <Button
        size="icon-lg"
        href="https://www.linkedin.com/in/seth-van-wieringen/"
        target="_blank"
    >
        <Linkedin
            strokeWidth="1"
            class="mx-2 size-9 stroke-teal-500 drop-shadow-lg"
        />
    </Button>
</div>

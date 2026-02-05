<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import * as Popover from "$lib/components/ui/popover";
    import { Copy } from "@lucide/svelte";
    import Affiliation from "./Affiliation.svelte";

    let copiedField = $state("");

    async function copy(value: string, field: string) {
        await navigator.clipboard.writeText(value);
        copiedField = field;
        setTimeout(() => (copiedField = ""), 1500);
    }

    const contactFields = [
        { label: "Email", value: "hi@sethvanwieringen.eu" },
        { label: "KvK", value: "99644398" },
        { label: "VAT ID", value: "NL005402474B27" },
        { label: "IBAN", value: "NL 13 KNAB 0780938135" },
        { label: "BIC", value: "KNAB NL 2H" },
    ];

    const skillGroups = [
        {
            label: "Energy System Modelling",
            skills: [
                "PyPSA",
                "Energy Transition Model",
                "linear/mixed-integer optimisation",
                "agent-based modelling",
                "uncertainty quantification",
                "scenario development",
                "techno-economic analysis",
                "spatial analysis",
            ],
        },
        {
            label: "Programming",
            skills: [
                "Python",
                "TypeScript",
                "JavaScript",
                "SQL",
                "Java",
                "Svelte",
                "Docker",
                "Astro",
                "VPS",
                "Azure",
                "Hetzner",
                "GCP",
            ],
        },
        {
            label: "Data & Visualisation",
            skills: [
                "explorative data analysis",
                "interactive dashboards",
                "policy support tools",
                "D3.js",
                "Plotly",
                "Matplotlib",
            ],
        },
        {
            label: "Consulting",
            skills: [
                "technical reporting",
                "stakeholder management",
                "government relations",
                "proposal development",
            ],
        },
        {
            label: "Project Management",
            skills: [
                "consortium collaboration",
                "budgeting",
                "team leadership",
                "coaching",
                "quality assurance",
            ],
        },
    ];
</script>

<div class="max-w-4xl mx-auto px-6 pt-36 pb-20">
    <h1 class="text-5xl mb-4">About</h1>
    <div
        class="text-slate-300 text-lg mb-16 max-w-2xl leading-relaxed space-y-6"
    >
        <p>
            Energy systems modeller who builds tools that make complexity
            accessible. I bring hands-on consulting experience with the drive to
            better inform energy planners and policy makers in the energy
            transition with open-source models and data.
        </p>
        <p>
            My expertise lies in energy system modelling, data analysis, and
            visualisation. I enjoy translating complex technical concepts into
            clear insights for diverse audiences. I'm passionate about
            open-source software and collaborative development. I believe
            transparency and shared knowledge are key to solving the energy
            challenges we face.
        </p>
        <p>
            When I'm not modelling energy systems, you can find me riding bikes,
            cooking and baking sourdough and being an awesome dad and husband.
        </p>
        <h2 class="text-3xl">Full-stack problem solver</h2>
        <p>
            I like to make things that work and make impact. Over the years I've
            always seen challenges as opportunities to learn new <a
                href="/about#skills"
                class="link">skills</a
            > which made me a versatile generalist. From data engineering, backend
            development, product engineering to stakeholder management and process
            design. I enjoy working on all layers of a problem to deliver end-to-end
            solutions that create value.
        </p>

        <h2 class="text-3xl" id="consultant">Brains for hire</h2>
        <p>
            I'm always open to discuss potential collaborations, consulting
            projects or job opportunities in the energy transition space.
            Combining energy, models/data/apps and consulting is what I do best,
            but I'm also open to other opportunities where I can add value.
        </p>
        <p>
            Feel free to&#32<a href="/about#contact" class="link"> reach out</a>
            if you think we could be a good match!
        </p>
    </div>

    <!-- Skills -->
    <section class="mb-16" id="skills">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Skills
        </h2>
        <div class="space-y-6">
            {#each skillGroups as group}
                <div>
                    <h3 class="text text-slate-200/80 tracking-wider mb-1">
                        > {group.label}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each group.skills as skill}
                            <Badge variant="teal">
                                {skill}
                            </Badge>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- Affiliations -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Affiliations
        </h2>

        <Affiliation
            role="Sector Lead Energy System"
            organization="Klimaat en Energie Koepel (KEK)"
            link="https://klimaatenergiekoepel.nl/"
            description="cross-sectoral network of 1000+ young professionals in energy and climate transition"
        />

        <Affiliation
            role="Guest lecturer"
            organization="University of Twente"
            link="https://www.utwente.nl/en/education/"
            description="teaching energy system modelling as part of the Energy System Integration course"
        />
    </section>

    <!-- Contact information -->
    <section class="mb-16" id="contact">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Contact information
        </h2>
        <div
            class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-lg items-center"
        >
            {#each contactFields as { label, value }}
                <span class="text-slate-400">{label}</span>
                <div class="flex items-center gap-2">
                    <span class="text-slate-200">{value}</span>
                    {#if value !== "t.b.a."}
                        <Popover.Root
                            bind:open={
                                () => copiedField === label,
                                (v) => {
                                    if (!v) copiedField = "";
                                }
                            }
                        >
                            <Popover.Trigger
                                onclick={() => copy(value, label)}
                                class="text-slate-400 hover:text-teal-300/80 transition-colors cursor-pointer"
                            >
                                <Copy size={16} />
                            </Popover.Trigger>
                            <Popover.Content
                                class="w-auto px-3 py-1.5 text-sm"
                                side="right"
                            >
                                Copied!
                            </Popover.Content>
                        </Popover.Root>
                    {/if}
                </div>
            {/each}
        </div>
    </section>
</div>

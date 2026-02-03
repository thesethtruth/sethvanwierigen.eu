<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import Affiliation from "./Affiliation.svelte";

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
        class="text-slate-300 text-lg mb-16 max-w-2xl leading-relaxed space-y-4"
    >
        <p>
            Energy systems modeller who builds tools that make complexity
            accessible. I bring hands-on consulting experience with a drive
            better inform the energy transition with open-source models and
            data.
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
    </div>

    <!-- Skills -->
    <section class="mb-16">
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
</div>

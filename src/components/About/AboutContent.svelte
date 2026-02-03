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
            skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
        },
        {
            label: "Data & Visualisation",
            skills: [
                "large dataset analysis",
                "interactive dashboards",
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
    <p class="text-slate-300 text-lg mb-16 max-w-2xl leading-relaxed">
        Energy systems modeller who builds tools that make complexity
        accessible. I bring hands-on consulting experience with a drive to teach
        and research. Physics teacher by qualification, coach by nature.
    </p>

    <!-- Skills -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Skills
        </h2>
        <div class="space-y-6">
            {#each skillGroups as group}
                <div>
                    <h3
                        class="text-sm text-teal-300/60 uppercase tracking-wider mb-3"
                    >
                        {group.label}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each group.skills as skill}
                            <Badge
                                class="bg-teal-500/10 text-teal-300/80 border-teal-500/20 text-xs"
                            >
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

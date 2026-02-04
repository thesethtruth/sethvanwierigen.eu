<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import ProjectCard from "./ProjectCard.svelte";

    const researchInterests = [
        "Energy system optimisation under uncertainty: robust decision-making for infrastructure planning when costs, policies, and technologies evolve",
        "Grid integration of variable renewables: cable pooling, storage co-location, and network-aware capacity expansion",
        "Bridging models and policy: explainability of optimisation outcomes, stakeholder engagement, and translating academic methods to actionable policy advice",
        "Agent-based approaches to energy markets: representing actor behaviour and market dynamics beyond perfect-foresight optimisation",
    ];

    const consultingProjects = [
        {
            title: "Scenario Study Nuclear Energy",
            role: "Lead modeller",
            description:
                "National policy study for the Ministry of Climate exploring the role of nuclear energy in the Dutch energy system. Adapted and applied PyPSA-Eur to evaluate various nuclear energy scenarios at European scale.",
            tags: ["policy", "energy", "PyPSA", "optimisation", "nuclear"],
            period: "2022",
            link: "https://www.tweedekamer.nl/downloads/document?id=2022D37754",
        },
        {
            title: "NPE Meta-Study",
            role: "Analyst",
            description:
                "Meta-analysis for the National Program Energy synthesising findings across multiple energy scenario studies to inform national energy policy.",
            tags: ["policy", "energy", "meta-study", "data analysis"],
            period: "2023",
            link: "https://www.rijksoverheid.nl/documenten/rapporten/2023/07/03/bijlage-7-ii-vergelijkende-analyse-systeemstudies-scenario-analyses-quintel-witteveen-bos",
        },
        {
            title: "CO2-free Electricity System 2035",
            role: "Lead modeller",
            description:
                "Study for the National Program Energy exploring pathways to a fully CO2-free electricity system by 2035. Modelled technology mixes, grid impacts, and cost implications.",
            tags: [
                "policy",
                "energy",
                "PyPSA",
                "optimisation",
                "market design",
            ],
            period: "2024",
            link: "https://www.rijksoverheid.nl/documenten/rapporten/2024/08/31/elektriciteitsmix-en-marktdynamiek-in-2035-co2-vrij-elektriciteitssysteem",
        },
    ];

    const toolingProjects = [
        {
            title: "Energy System Optimisation Frameworks",
            role: "Developer & Architect",
            description:
                "Built in-house optimisation frameworks for energy system modelling at Witteveen+Bos, enabling national policy advice through proprietary PyPSA-based workflows.",
            tags: ["PyPSA", "Python", "optimisation", "energy"],
        },
        {
            title: "Energy Decision-Support Tools",
            role: "Full-Stack Developer",
            description:
                "Full-stack development of interactive tools for energy decision-making, combining data analysis with intuitive visualisations.",
            tags: ["TypeScript", "Python", "full-stack", "data visualisation"],
        },
        {
            title: "pMIEK Infrastructure Prioritisation (TIP)",
            role: "Architect and lead developer",
            description:
                "Infrastructure prioritisation study for the province of Zuid-Holland. Developed modelling frameworks to support investment decisions in energy infrastructure.",
            tags: [
                "energy",
                "infrastructure",
                "decentral government",
                "multi-level",
                "ETM",
            ],
            period: "2025",
            link: "https://github.com/witteveenbos/TIP",
        },
        {
            title: "Semi-Autonomous Energy Systems (HOLON)",
            role: "Architect & Developer",
            description:
                "Research and model development using innovative data architectures and agent-based modelling for semi-autonomous energy systems.",
            tags: ["agent-based modelling", "Python", "research", "energy"],
            link: "https://github.com/Zenmo/Holon-webapp",
            period: "2021-2023",
        },
        {
            title: "W+B AI Adoption Program",
            role: "Founder & Team Leader",
            description:
                "Founded and led the company-wide AI adoption program at Witteveen+Bos. Team leader of the AI Development team building internal AI tooling.",
            tags: ["AI", "leadership", "TypeScript", "Python"],
            period: "2024-2026",
        },
    ];
</script>

<div class="max-w-4xl mx-auto px-6 pt-36 pb-20">
    <h1 class="text-5xl mb-4">Projects</h1>
    <p class="text-slate-300 text-lg mb-16 max-w-2xl">
        A selection of studies I've worked on and tools I've built. I also teach
        and conduct research from time to time.
    </p>

    <!-- Consulting -->
    <section id="consulting" class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Consulting
        </h2>
        <div class="grid gap-10">
            {#each consultingProjects as project}
                <ProjectCard {...project} />
            {/each}
        </div>
    </section>

    <!-- Tooling & Development -->
    <section id="tooling" class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Tooling & Development
        </h2>
        <div class="grid gap-10">
            {#each toolingProjects as project}
                <ProjectCard {...project} />
            {/each}
        </div>
    </section>

    <!-- Research and teaching -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Research
        </h2>

        <div class="mb-10">
            <h3 class="text-xl text-slate-50/90 mb-4">Publication</h3>
            <div>
                <h3 class=" text-teal-300/80 font-bold text-xl">2025</h3>
                <p class="text-slate-50/90 font-medium leading-relaxed">
                    Cable pooling to add renewables amid grid congestion:
                    Exploring optimal integration of solar and batteries with
                    existing onshore wind under cost uncertainty
                </p>
                <p class="text-slate-400 text-sm mt-2">
                    Emiel van Druten, Seth van Wieringen
                </p>
                <div class="flex items-center gap-3 mt-3">
                    <a
                        href="https://doi.org/10.1016/j.segan.2025.101971"
                        target="_blank"
                        class="link text-sm"
                    >
                        Sustainable Energy, Grids and Networks
                    </a>
                </div>
            </div>
        </div>

        <h3 class="text-xl text-slate-50/90 mb-4">Research interests</h3>
        <ul class="space-y-3">
            {#each researchInterests as interest}
                <li
                    class="text-slate-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-teal-500/40 before:rounded-full leading-relaxed"
                >
                    {interest}
                </li>
            {/each}
        </ul>
    </section>

    <!-- Teaching -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Teaching
        </h2>
        <div
            class="border-l-2 border-teal-500/30 pl-6 hover:border-teal-500/60 transition-colors duration-300"
        >
            <div
                class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1"
            >
                <div>
                    <h3 class="text-xl">University of Twente</h3>
                    <p class="text-teal-300/60 text-sm">
                        Guest Lecturer, Energy Systems Integration
                    </p>
                </div>
                <span class="text-sm text-slate-500">Sept 2024 - present</span>
            </div>
            <ul class="mt-3 space-y-2">
                <li
                    class="text-slate-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-teal-500/40 before:rounded-full"
                >
                    Developed and delivered lectures on energy system modelling
                    for MSc course Energy Systems Integration
                </li>
                <li
                    class="text-slate-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-teal-500/40 before:rounded-full"
                >
                    Created a <a
                        href="https://thesethtruth.github.io/esi-course-utwente/intro.html"
                        class="link">hands-on PyPSA workshop</a
                    > with code repository, bridging industry challenges with academic
                    curriculum
                </li>
            </ul>
        </div>

        <div class="mt-6 flex items-center gap-3">
            <Badge
                class="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs"
            >
                Certification
            </Badge>
            <span class="text-slate-400 text-xs md:text-sm"
                >Physics Teaching Qualification (Tweedegraads
                Onderwijsbevoegdheid) - University of Twente, 2018</span
            >
        </div>
    </section>
</div>

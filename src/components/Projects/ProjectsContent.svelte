<script lang="ts">
    import ProjectCard from "./ProjectCard.svelte";

    const consultingProjects = [
        {
            title: "Scenario Study Nuclear Energy",
            role: "Lead modeller",
            description:
                "National policy study for the Ministry of Climate exploring the role of nuclear energy in the Dutch energy system. Built and applied optimisation frameworks to evaluate long-term scenarios.",
            tags: ["policy", "energy", "PyPSA", "optimisation", "nuclear"],
            period: "2022",
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
        },
        {
            title: "pMIEK Infrastructure Prioritisation",
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
        },
        {
            title: "NPE Meta-Study",
            role: "Analyst",
            description:
                "Meta-analysis for the National Program Energy synthesising findings across multiple energy scenario studies to inform national energy policy.",
            tags: ["policy", "energy", "meta-study", "data analysis"],
            period: "2023",
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
            title: "Cable Pooling Analysis Tool",
            role: "Researcher & Developer",
            description:
                "Research tool exploring optimal integration of solar and batteries with existing onshore wind under cost uncertainty. Published in Sustainable Energy, Grids and Networks.",
            tags: ["PyPSA", "research", "renewables", "grid", "uncertainty"],
            link: "https://doi.org/10.1016/j.segan.2025.101971",
        },
        {
            title: "Semi-Autonomous Energy Systems",
            role: "Researcher & Developer",
            description:
                "Research and model development using innovative data architectures and agent-based modelling for semi-autonomous energy systems.",
            tags: ["agent-based modelling", "Python", "research", "energy"],
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
        A selection of consulting studies and tools I've built — from national
        energy policy advice to open-source model development.
    </p>

    <!-- Consulting -->
    <section id="consulting" class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Consulting
        </h2>
        <div class="grid gap-5">
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
        <div class="grid gap-5">
            {#each toolingProjects as project}
                <ProjectCard {...project} />
            {/each}
        </div>
    </section>
</div>

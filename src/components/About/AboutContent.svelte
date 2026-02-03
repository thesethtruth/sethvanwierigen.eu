<script lang="ts">
    import Badge from "$lib/components/ui/badge/badge.svelte";

    const experience = [
        {
            org: "Witteveen+Bos",
            role: "Energy Systems Modeller, Project & Team Manager",
            location: "Deventer, Netherlands",
            period: "Jan 2021 - present",
            points: [
                "Built a centre of expertise on energy system modelling by developing and applying in-house optimisation frameworks for national policy advice",
                "Lead modeller on national policy studies including Scenario Study Nuclear Energy, CO2-free electricity system 2035, and pMIEK infrastructure prioritisation",
                "Research and model development on semi-autonomous energy systems using innovative data architectures and agent-based modelling",
                "Full-stack development of energy decision-support tools",
                "Founded and led W+B company-wide AI adoption program; Team leader AI Development team",
            ],
        },
        {
            org: "University of Twente",
            role: "Guest Lecturer, Energy Systems Integration",
            location: "Enschede, Netherlands",
            period: "Sept 2024 - present",
            points: [
                "Co-developed course content including lecture materials and course project manual",
                "Developed and delivered lecture on energy system modelling for MSc course",
                "Created hands-on PyPSA workshop with code repository, drawing from Grid Outlook studies and National Program Energy",
            ],
        },
        {
            org: "BPR Solar",
            role: "Project & Quality Manager",
            location: "Netherlands",
            period: "Jan 2018 - Jan 2021",
            points: [
                "Project management during construction phase of large-scale solar parks (30+ MWp)",
                "Digitisation of quality management at European EPC level",
            ],
        },
    ];

    const education = [
        {
            degree: "MSc",
            institution: "University of Twente",
            field: "Sustainable Energy Technology & Mechanical Engineering (Design Engineering)",
            location: "Enschede, Netherlands",
            period: "Sept 2018 - Dec 2021",
            notes: [
                "Graduated Cum Laude in both master programmes",
                "Thesis: Transitioning to cost-optimal renewable energy systems under uncertainty (9.2/10)",
            ],
        },
        {
            degree: "Research Internship",
            institution: "2G Energietechnik GmbH",
            field: "Multiphysics Engineering",
            location: "Heek, Germany",
            period: "Sept 2019 - Dec 2019",
            notes: [
                "Multi-phase CFD analysis of urea-water solution mixing and evaporation for SCR in decentralised CHP units (9/10)",
            ],
        },
        {
            degree: "BSc",
            institution: "University of Twente",
            field: "Mechanical Engineering",
            location: "Enschede, Netherlands",
            period: "Sept 2014 - Aug 2018",
            notes: [
                "Thesis: Blending of pyrolysis oil, biodiesel and sustainable alcohols for maritime diesel engines (8.3/10)",
                "Minor BioRobotics (2016), Minor Teaching Physics (2016)",
            ],
        },
    ];

    const researchInterests = [
        "Energy system optimisation under uncertainty: robust decision-making for infrastructure planning when costs, policies, and technologies evolve",
        "Grid integration of variable renewables: cable pooling, storage co-location, and network-aware capacity expansion",
        "Bridging models and policy: explainability of optimisation outcomes, stakeholder engagement, and translating academic methods to actionable policy advice",
        "Agent-based approaches to energy markets: representing actor behaviour and market dynamics beyond perfect-foresight optimisation",
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
        accessible. I bring hands-on consulting experience with a drive to
        teach and research. Physics teacher by qualification, coach by nature.
    </p>

    <!-- Experience -->
    <section id="consultant" class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Experience
        </h2>
        <div class="space-y-8">
            {#each experience as exp}
                <div
                    class="border-l-2 border-teal-500/30 pl-6 hover:border-teal-500/60 transition-colors duration-300"
                >
                    <div
                        class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1"
                    >
                        <div>
                            <h3 class="text-xl">{exp.org}</h3>
                            <p class="text-teal-300/60 text-sm">{exp.role}</p>
                        </div>
                        <div class="text-sm text-slate-500 shrink-0 sm:text-right">
                            <p>{exp.period}</p>
                            <p>{exp.location}</p>
                        </div>
                    </div>
                    <ul class="mt-3 space-y-2">
                        {#each exp.points as point}
                            <li
                                class="text-slate-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-teal-500/40 before:rounded-full"
                            >
                                {point}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </section>

    <!-- Education -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Education
        </h2>
        <div class="space-y-8">
            {#each education as edu}
                <div
                    class="border-l-2 border-teal-500/30 pl-6 hover:border-teal-500/60 transition-colors duration-300"
                >
                    <div
                        class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1"
                    >
                        <div>
                            <h3 class="text-xl">
                                <span class="text-teal-300/60 text-base mr-2"
                                    >{edu.degree}</span
                                >
                                {edu.institution}
                            </h3>
                            <p class="text-slate-400 text-sm">{edu.field}</p>
                        </div>
                        <div class="text-sm text-slate-500 shrink-0 sm:text-right">
                            <p>{edu.period}</p>
                            <p>{edu.location}</p>
                        </div>
                    </div>
                    <ul class="mt-3 space-y-2">
                        {#each edu.notes as note}
                            <li
                                class="text-slate-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-teal-500/40 before:rounded-full"
                            >
                                {note}
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </section>

    <!-- Research & Publications -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Research
        </h2>

        <div class="mb-10">
            <h3 class="text-lg text-slate-50/90 mb-4">Publication</h3>
            <div
                class="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6"
            >
                <p class="text-slate-50/90 font-medium leading-relaxed">
                    Cable pooling to add renewables amid grid congestion:
                    Exploring optimal integration of solar and batteries with
                    existing onshore wind under cost uncertainty
                </p>
                <p class="text-slate-400 text-sm mt-2">
                    Emiel van Druten, Seth van Wieringen
                </p>
                <div class="flex items-center gap-3 mt-3">
                    <Badge
                        class="bg-teal-500/10 text-teal-300/80 border-teal-500/20 text-xs"
                    >
                        2025
                    </Badge>
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

        <h3 class="text-lg text-slate-50/90 mb-4">Research Interests</h3>
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
                    Created hands-on PyPSA workshop with code repository,
                    bridging industry challenges with academic curriculum
                </li>
            </ul>
        </div>

        <div
            class="border-l-2 border-teal-500/30 pl-6 hover:border-teal-500/60 transition-colors duration-300 mt-8"
        >
            <div
                class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1"
            >
                <div>
                    <h3 class="text-xl">
                        University of Twente Pre-University
                    </h3>
                    <p class="text-teal-300/60 text-sm">Working Student</p>
                </div>
                <span class="text-sm text-slate-500"
                    >Jan 2016 - July 2017</span
                >
            </div>
            <ul class="mt-3 space-y-2">
                <li
                    class="text-slate-300 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-teal-500/40 before:rounded-full"
                >
                    Developed and delivered workshops introducing high school
                    students to academic technical studies
                </li>
            </ul>
        </div>

        <div class="mt-6 flex items-center gap-3">
            <Badge
                class="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs"
            >
                Certification
            </Badge>
            <span class="text-slate-400 text-sm"
                >Physics Teaching Qualification (Tweedegraads
                Onderwijsbevoegdheid) - University of Twente, 2018</span
            >
        </div>
    </section>

    <!-- Skills -->
    <section class="mb-16">
        <h2 class="text-3xl mb-8 flex items-center gap-3">
            <span class="text-teal-500/80">&#47;&#47;</span> Skills
        </h2>
        <div class="space-y-6">
            {#each skillGroups as group}
                <div>
                    <h3 class="text-sm text-teal-300/60 uppercase tracking-wider mb-3">
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
        <p class="text-slate-300 leading-relaxed">
            Sector Lead Energy Systems at <span class="text-slate-50/90"
                >Klimaat en Energie Koepel (KEK)</span
            > - cross-sectoral network of 1000+ young professionals in energy and
            climate transition.
        </p>
    </section>
</div>

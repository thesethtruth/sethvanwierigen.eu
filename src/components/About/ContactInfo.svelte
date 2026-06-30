<script lang="ts">
    let copiedField = $state("");

    const contactFields = [
        { label: "Email", value: "hi@sethvanwieringen.eu" },
        { label: "KvK", value: "99644398" },
        { label: "VAT ID", value: "NL005402474B27" },
        { label: "IBAN", value: "NL 13 KNAB 0780938135" },
        { label: "BIC", value: "KNAB NL 2H" },
    ];

    async function copy(value: string, field: string) {
        await navigator.clipboard.writeText(value);
        copiedField = field;
        setTimeout(() => (copiedField = ""), 1500);
    }
</script>

<section class="mb-16" id="contact">
    <h2 class="text-3xl mb-8 flex items-center gap-3">
        <span class="text-teal-500/80">&#47;&#47;</span> Contact information
    </h2>
    <div class="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-lg items-center">
        {#each contactFields as { label, value }}
            <span class="text-slate-400">{label}</span>
            <div class="flex items-center gap-2">
                <span class="text-slate-200">{value}</span>
                <button
                    type="button"
                    onclick={() => copy(value, label)}
                    class="inline-flex items-center gap-1 text-slate-400 hover:text-teal-300/80 transition-colors cursor-pointer"
                    aria-label={`Copy ${label}`}
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        class="size-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="9" y="9" width="11" height="11" rx="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {#if copiedField === label}
                        <span class="text-xs text-teal-300/80">Copied</span>
                    {/if}
                </button>
            </div>
        {/each}
    </div>
</section>

export interface ImportanceInput {
    element: string;
    score: number;
}

export interface ImportanceCloudWord {
    text: string;
    score: number;
    size: number;
    x: number;
    y: number;
    rotate: number;
    color: string;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function normalize(value: number, min: number, max: number): number {
    if (max === min) return 1;
    return (value - min) / (max - min);
}

const MIN_SIZE = 20;
const MAX_SIZE = 66;
const COLORS = [
    "#2E9399", // logo teal
    "#168B8F", // deep teal
    "#F0B03D", // warm orange
    "#F6D43A", // logo yellow
    "#E5723A", // orange-red accent
];
const D3_CLOUD_SCRIPT = "/d3.layout.cloud.js";

interface CloudWordInput {
    text: string;
    score: number;
    size: number;
}

interface CloudLayoutWord extends CloudWordInput {
    x: number;
    y: number;
    rotate: number;
}

interface CloudLayout {
    size(value: [number, number]): CloudLayout;
    words(value: CloudWordInput[]): CloudLayout;
    padding(value: number): CloudLayout;
    rotate(value: (word: CloudWordInput, index: number) => number): CloudLayout;
    font(value: string): CloudLayout;
    fontWeight(value: string): CloudLayout;
    fontSize(value: (word: CloudWordInput) => number): CloudLayout;
    random(value: () => number): CloudLayout;
    on(
        event: "end",
        callback: (words: CloudLayoutWord[]) => void,
    ): CloudLayout;
    start(): CloudLayout;
}

interface D3CloudNamespace {
    layout: {
        cloud: () => CloudLayout;
    };
}

declare global {
    interface Window {
        d3?: D3CloudNamespace;
    }
}

function buildCloudInputs(items: ImportanceInput[]): CloudWordInput[] {
    if (items.length === 0) return [];

    const sorted = [...items].sort((a, b) => b.score - a.score);
    const scores = sorted.map((item) => item.score);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    return sorted.map((item) => {
        const t = clamp(normalize(item.score, minScore, maxScore), 0, 1);
        return {
            text: item.element,
            score: item.score,
            size: MIN_SIZE + t * (MAX_SIZE - MIN_SIZE),
        };
    });
}

function getD3Cloud(): D3CloudNamespace | null {
    return typeof window !== "undefined" ? window.d3 ?? null : null;
}

async function loadD3CloudScript(): Promise<D3CloudNamespace> {
    const existing = getD3Cloud();
    if (existing?.layout?.cloud) return existing;

    await new Promise<void>((resolve, reject) => {
        const current = document.querySelector<HTMLScriptElement>(
            `script[src="${D3_CLOUD_SCRIPT}"]`,
        );
        if (current) {
            current.addEventListener("load", () => resolve(), { once: true });
            current.addEventListener(
                "error",
                () => reject(new Error("Failed to load d3.layout.cloud.js")),
                { once: true },
            );
            return;
        }

        const script = document.createElement("script");
        script.src = D3_CLOUD_SCRIPT;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
            reject(new Error("Failed to load d3.layout.cloud.js"));
        document.head.appendChild(script);
    });

    const d3 = getD3Cloud();
    if (!d3?.layout?.cloud) {
        throw new Error("d3.layout.cloud API not available on window.d3");
    }

    return d3;
}

export async function buildImportanceCloudLayout(
    items: ImportanceInput[],
    width: number,
    height: number,
    options?: {
        padding?: number;
        seed?: number;
    },
): Promise<ImportanceCloudWord[]> {
    const cloudInputs = buildCloudInputs(items);
    if (cloudInputs.length === 0) return [];

    const d3 = await loadD3CloudScript();
    const padding = options?.padding ?? 1;
    const seededRandom = createSeededRandom(options?.seed ?? Date.now());

    return await new Promise<ImportanceCloudWord[]>((resolve) => {
        d3.layout
            .cloud()
            .size([Math.max(280, width), Math.max(220, height)])
            .words(cloudInputs)
            .padding(Math.max(0, padding))
            .rotate(() => 0)
            .font("Arial")
            .fontWeight("600")
            .fontSize((word) => word.size)
            .random(seededRandom)
            .on("end", (words) => {
                resolve(
                    words.map((word, index) => ({
                        text: word.text,
                        score: word.score,
                        size: word.size,
                        x: word.x,
                        y: word.y,
                        rotate: 0,
                        color: COLORS[index % COLORS.length],
                    })),
                );
            })
            .start();
    });
}

function createSeededRandom(seed: number): () => number {
    let t = Math.floor(seed) || 1;
    return () => {
        t += 0x6d2b79f5;
        let x = Math.imul(t ^ (t >>> 15), t | 1);
        x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}

export interface ImportanceInput {
    element: string;
    score: number;
}

export interface ImportanceCloudItem extends ImportanceInput {
    rank: number;
    sizePx: number;
    alpha: number;
    tiltDeg: number;
}

const MIN_SIZE = 16;
const MAX_SIZE = 54;
const MIN_ALPHA = 0.5;
const MAX_ALPHA = 1;

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

function normalize(value: number, min: number, max: number): number {
    if (max === min) return 1;
    return (value - min) / (max - min);
}

export function buildImportanceCloud(items: ImportanceInput[]): ImportanceCloudItem[] {
    const sorted = [...items].sort((a, b) => b.score - a.score);

    if (sorted.length === 0) return [];

    const scores = sorted.map((item) => item.score);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);

    return sorted.map((item, index) => {
        const t = clamp(normalize(item.score, minScore, maxScore), 0, 1);
        const sizePx = MIN_SIZE + t * (MAX_SIZE - MIN_SIZE);
        const alpha = MIN_ALPHA + t * (MAX_ALPHA - MIN_ALPHA);
        const tiltDeg = ((index % 4) - 1.5) * 2;

        return {
            ...item,
            rank: index + 1,
            sizePx,
            alpha,
            tiltDeg,
        };
    });
}

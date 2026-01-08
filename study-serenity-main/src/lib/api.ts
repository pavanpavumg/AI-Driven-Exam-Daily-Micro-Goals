const BASE_URL = "http://localhost:8000";

export async function getConfidence() {
    const res = await fetch(`${BASE_URL}/confidence`);
    if (!res.ok) throw new Error("Failed to fetch confidence");
    return res.json();
}

export async function getGoals() {
    const res = await fetch(`${BASE_URL}/generate-goals`);
    if (!res.ok) throw new Error("Failed to fetch goals");
    return res.json();
}

export async function getEncouragement() {
    const res = await fetch(`${BASE_URL}/encouragement`);
    if (!res.ok) throw new Error("Failed to fetch encouragement");
    return res.json();
}

export async function safeFetch(url: string, fallback: any) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("API Error");
        return await res.json();
    } catch {
        return fallback;
    }
}

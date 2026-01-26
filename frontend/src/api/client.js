const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(data.message || "API request failed");
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
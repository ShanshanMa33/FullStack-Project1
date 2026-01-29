const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function request(path, options = {}) {
    const token = localStorage.getItem("token");
    const headers = { ...options.headers };

    if (options.body && !(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["auth-token"] = token;
    }

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        if (response.status === 401) {
            console.warn("Token expired, logging out...");
        }
        const error = new Error(data.message || data.error || "API request failed");
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}
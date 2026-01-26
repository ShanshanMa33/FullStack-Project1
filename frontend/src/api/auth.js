import { request } from "./client.js";

export function apiSignup(email, password) {
    return request("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password })
    })
}

export async function apiLogin(email, password) {
    try {
        const data = await request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        return data;
    } catch (error) {
        const errorMessage = error.message || 'Login failed.';
        throw new Error(errorMessage);
    }
}

export function apiForgotPassword(email) {
    return request("/api/auth/forgotpassword", {
        method: "POST",
        body: JSON.stringify({ email })
    })
}
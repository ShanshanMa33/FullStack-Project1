import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPasswordThunk } from "../../store/slices/Thunks";

function isValidEmail(email) {
    return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [email, setEmail] = useState("");
    const [localError, setLocalError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setLocalError("");

        if (!isValidEmail(email)) {
            setLocalError("Invalid Email input!");
            return;
        }

        try {
            await dispatch(forgotPasswordThunk({ email })).unwrap();
            navigate("/forgot-password-success");
        } catch (err) {
            setLocalError(typeof err?.message === "string" ? err.message : "Request failed. Please try again.");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={() => navigate("/")}>×</button>
                <h1 className="auth-title">Update your Password</h1>
                <p className="auth-subtitle">
                    Enter your email link, we will send you the recovery link
                </p>
                <form className="auth-form" onSubmit={handleSubmit} style={{ marginTop: 18 }}>
                    <label className="auth-label">Email</label>
                    <input
                        className={`auth-input ${localError.includes("Email") ? "input-error" : ""}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    {localError.includes("Email") && <div className="error-text">{localError}</div>}

                    <button className="auth-submit" type="submit" disabled={loading} style={{ marginTop: 24 }}>
                        {loading ? "Sending..." : "Update password"}
                    </button>

                    {error && !localError && <div className="error-text" style={{ marginTop: 12 }}>{error}</div>}
                </form>
            </div>
        </div>
    )
}
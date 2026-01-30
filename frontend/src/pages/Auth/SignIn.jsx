import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginThunk } from '../../store/slices/Thunks';
import { clearAuthMessages } from "../../store/slices/authSlice";

function isValidEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, successMessage } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const from = location.state?.from?.pathname || "/";
    const cartItems = useSelector(state => state.cart.items);

    async function handleSubmit(e) {
        e.preventDefault();
        setLocalError("");
        localStorage.setItem('guest_cart_snapshot', JSON.stringify(cartItems));//n
        //console.log("SignIn submit fired", { email, password })


        if (!isValidEmail(email)) {
            setLocalError("Please enter a valid email address.");
            return;
        }

        if (!password || password.length < 6) {
            setLocalError("Invalid password.");
            return;
        }


        const action = await dispatch(loginThunk({ email, password }));
        console.log("Login action:", action);

        if (loginThunk.fulfilled.match(action)) {
            // navigate(from, { replace: true });
            setLocalError("");
        }
    }

    return (

        <div className="auth-page">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={() => navigate("/")}>×</button>
                <h1 className="auth-title">Sign in to your account</h1>

                {/** Clear messages on mount */}
                {error && <div className="auth-alert auth-alert-error">{error}</div>}
                {successMessage && <div className="auth-alert auth-alert-success">{successMessage}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label">Email</label>
                    <input
                        className={`auth-input ${localError.toLowerCase().includes("email") ? "input-error" : ""}`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            dispatch(clearAuthMessages())
                            if (localError) setLocalError("");
                        }}
                        placeholder="Enter your email"
                    />
                    {localError.toLowerCase().includes("email") && <div className="error-text">{localError}</div>}

                    <label className="auth-label">Password</label>
                    <div className="password-row">
                        <input
                            className={`auth-input ${localError.toLowerCase().includes("password") ? "input-error" : ""}`}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                dispatch(clearAuthMessages())
                                if (localError) setLocalError("");
                            }}
                            placeholder="Enter your password"
                        />
                        <button
                            className="show-password" type="button" onClick={() => setShowPassword((v) => !v)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {localError.toLowerCase().includes("password") && <div className="error-text">{localError}</div>}

                    <button className="auth-submit" type="submit" disabled={!!loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    {localError && !localError.toLowerCase().includes("email") && !localError.toLowerCase().includes("password") && (
                        <div className="error-text">{localError}</div>
                    )}

                    <div className="auth-links">
                        <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

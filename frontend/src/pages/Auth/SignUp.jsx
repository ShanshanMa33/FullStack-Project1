import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupThunk } from '../../store/slices/Thunks';

function isValidEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
    return typeof password === 'string' && password.length >= 6;
}

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const emailInvalid = touched.email && !isValidEmail(email);
    const passwordInvalid = touched.password && !isValidPassword(password);
    const confirmPasswordInvalid = touched.confirmPassword && password !== confirmPassword;

    useEffect(() => {
        if (email.length > 0) setTouched((t) => ({ ...t, email: true }));
    }, [email]);

    useEffect(() => {
        if (password.length > 0) setTouched((t) => ({ ...t, password: true }));
    }, [password]);

    useEffect(() => {
        if (confirmPassword.length > 0) setTouched((t) => ({ ...t, confirmPassword: true }));
    }, [confirmPassword]);

    async function handleSubmit(e) {
        e.preventDefault();

        setTouched({ email: true, password: true, confirmPassword: true });

        if (!isValidEmail(email) || !isValidPassword(password) || password !== confirmPassword) {
            return;
        }

        try {
            await dispatch(signupThunk({ email, password })).unwrap();
            navigate('/signin');
        } catch (err) {
            // Error handled by Redux state
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-modal">
                <button className="auth-close" type="button" onClick={() => navigate("/")}>×</button>
                <h1 className="auth-title">Sign up an account</h1>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="auth-label">Email</label>
                    <input
                        className={`auth-input ${emailInvalid ? 'input-error' : ''}`}
                        value={email}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    {emailInvalid && <div className="error-text">Invalid Email input!</div>}

                    <label className="auth-label">Password</label>
                    <div className="password-row">
                        <input
                            className={`auth-input ${passwordInvalid ? 'input-error' : ''}`}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        <button
                            className="show-password" type="button" onClick={() => setShowPassword((v) => !v)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordInvalid && <div className="error-text">Invalid Password input!</div>}

                    <label className="auth-label">Confirm Password</label>
                    <input
                        className={`auth-input ${confirmPasswordInvalid ? 'input-error' : ''}`}
                        type="password"
                        value={confirmPassword}
                        onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                    {confirmPasswordInvalid && <div className="error-text">Passwords do not match.</div>}

                    <button className="auth-submit" type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>

                    {error && <div className="error-text api-error">{error}</div>}

                    <div className="auth-links" style={{ justifyContent: 'center' }}>
                        <span>Already have an account?</span>
                        <Link className="auth-link" to="/signin">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
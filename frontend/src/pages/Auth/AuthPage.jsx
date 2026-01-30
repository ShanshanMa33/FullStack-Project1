import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { loginThunk, signupThunk, forgotPasswordThunk } from "../../store/slices/Thunks";
import { clearAuthMessages } from "../../store/slices/authSlice";
import PasswordField from "../../components/PasswordField";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(pw) {
  return typeof pw === "string" && pw.length >= 6;
}

export default function AuthPage({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart?.items || []);

  // fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false });
  const [localError, setLocalError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const from = location.state?.from?.pathname || "/";

  // titles
  const title = useMemo(() => {
    if (type === "signin") return "Sign in to your account";
    if (type === "signup") return "Sign up an account";
    if (type === "update-password") return "Update your password";
    return "Auth";
  }, [type]);

  // basic invalid flags
  const emailInvalid = touched.email && !isValidEmail(email);
  const passwordInvalid = touched.password && (type !== "update-password") && !isValidPassword(password);
  const confirmInvalid =
    type === "signup" && touched.confirmPassword && password !== confirmPassword;

  useEffect(() => {
    // when type changes, reset UI
    setLocalError("");
    setSignupSuccess(false);
    setTouched({ email: false, password: false, confirmPassword: false });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    dispatch(clearAuthMessages());
  }, [type, dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");
    setTouched({ email: true, password: true, confirmPassword: true });

    // shared: email validation
    if (!isValidEmail(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    try {
      if (type === "signin") {
        if (!isValidPassword(password)) {
          setLocalError("Invalid password.");
          return;
        }

        localStorage.setItem("guest_cart_snapshot", JSON.stringify(cartItems));

        const action = await dispatch(loginThunk({ email, password }));
        if (loginThunk.fulfilled.match(action)) {
          // optional: go back where user came from
          navigate(from, { replace: true });
        }
        return;
      }

      if (type === "signup") {
        if (!isValidPassword(password)) {
          setLocalError("Password must be at least 6 characters.");
          return;
        }
        if (password !== confirmPassword) {
          setLocalError("Passwords do not match.");
          return;
        }

        await dispatch(signupThunk({ email, password })).unwrap();
        setSignupSuccess(true); // show success message
        return;
      }

      if (type === "update-password") {
        await dispatch(forgotPasswordThunk({ email })).unwrap();
        navigate("/forgot-password-success");
        return;
      }
    } catch (err) {
      // keep it simple; backend error already in Redux `error`
      setLocalError(typeof err?.message === "string" ? err.message : "Request failed. Please try again.");
    }
  }

  // test error boundary
  //throw new Error("Test error boundary");

  return (
    <div className="auth-page">
      <div className="auth-modal">
        <button className="auth-close" type="button" onClick={() => navigate("/")}>
          ×
        </button>

        <h1 className="auth-title">{title}</h1>

        {type === "update-password" && (
          <p className="auth-subtitle">
            Enter your email link, we will send you the recovery link
          </p>
        )}

        {/* alerts */}
        {error && <div className="auth-alert auth-alert-error">{error}</div>}
        {successMessage && <div className="auth-alert auth-alert-success">
          {type === "signup" ? (
            <> {successMessage} <Link to="/signin" className="auth-success-link">Sign In</Link>.</>
          ) : (
            successMessage
          )}
        </div>}
        {!error && localError && (<div className="auth-alert auth-alert-error">{localError}</div>)}



        {/* SIGNUP success screen */}
        {type === "signup" && signupSuccess ? (
          <div style={{ height: 8 }} ></div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} style={type === "update-password" ? { marginTop: 18 } : undefined}>
            {/* Email */}
            <label className="auth-label">Email</label>
            <input
              className={`auth-input ${emailInvalid ? "input-error" : ""}`}
              value={email}
              placeholder="Enter your email"
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onChange={(e) => {
                setEmail(e.target.value);
                dispatch(clearAuthMessages());
                if (localError) setLocalError("");
              }}
            />
            {emailInvalid && !error && !localError && <div className="error-text">Invalid Email input!</div>}

            {/* Password + confirm only for signin/signup */}
            {type !== "update-password" && (
              <PasswordField
                label="Password"
                value={password}
                placeholder="Enter your password"
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                onChange={(e) => {
                  setPassword(e.target.value);
                  dispatch(clearAuthMessages());
                  if (localError) setLocalError("");
                }}
                errorText={passwordInvalid ? "Invalid Password input!" : ""}

              />
            )}

            {type === "signup" && (
              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                placeholder="Confirm your password"
                onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  dispatch(clearAuthMessages());
                  if (localError) setLocalError("");
                }}
                errorText={confirmInvalid && !error && !localError ? "Passwords do not match." : ""}
              />
            )}


            <button className="auth-submit" type="submit" disabled={!!loading} style={type === "update-password" ? { marginTop: 24 } : undefined}>
              {type === "signin" && (loading ? "Signing In..." : "Sign In")}
              {type === "signup" && (loading ? "Creating..." : "Create Account")}
              {type === "update-password" && (loading ? "Sending..." : "Update password")}
            </button>

            {/* Links */}
            {type === "signin" && (
              <div className="auth-links">
                <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            )}

            {type === "signup" && (
              <div className="auth-links" style={{ justifyContent: "center" }}>
                <span>Already have an account?</span>
                <Link className="auth-link" to="/signin">Sign In</Link>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

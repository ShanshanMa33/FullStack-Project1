import { useState } from 'react';

export default function PasswordField({
    label,
    value,
    onChange,
    onBlur,
    placeholder,
    errorText,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <label className="auth-label">{label}</label>
            <div className="password-row">
                <input
                    className={`auth-input ${errorText ? 'input-error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                <button
                    className="show-password"
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            {errorText && <div className="error-text">{errorText}</div>}
        </>
    )
}
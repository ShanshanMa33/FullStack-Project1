import { useNavigate } from "react-router-dom";

export default function ForgotSuccess() {
    const navigate = useNavigate();

    return (
        <div className="auth-page">
            <div className="auth-modal">
                <button className="auth-close" onClick={() => navigate("/")}>x</button>
                <div class="auth-success">
                    {/* <img className="auth-success-icon" src="/icons/success.svg" alt="Mail" /> */}
                    <div style={{ fontSize: 56 }}>Mail</div>

                    <p className="auth-sucess-text">
                        We have sent the update password link to you email, please check that!
                    </p>
                </div>
            </div>
        </div>
    );
}
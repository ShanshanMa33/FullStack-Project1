import { useNavigate } from "react-router-dom";
import mail from "../../assets/mail.svg";

export default function ForgotSuccess() {
    const navigate = useNavigate();

    return (
        <div className="auth-page">
            <div className="auth-modal">
                <button className="auth-close" onClick={() => navigate("/")}>×</button>
                <div className="auth-success">
                    <img className="auth-success-icon" src={mail} alt="Mail" />

                    <p className="auth-success-text">
                        We have sent the update password link to you email, please check that!
                    </p>
                </div>
            </div>
        </div>
    );
}
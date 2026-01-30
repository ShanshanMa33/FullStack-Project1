import React from 'react';
import Button from '../../components/common/Button/Button.jsx';
import "./ErrorPage.css";
import errorIcon from "../../assets/fluent_error-circle.svg";
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';

export default function ErrorPage({
    title = "Oops! Something went wrong!",
    message = "Something is not working as expected.",
    actionText = "Go Home",
    onAction,
}) {
    const handleGoHome = () => {
        if (onAction) {
            onAction();
        } else {
            window.location.href = "/";
        }
    }

    return (
        <div className="error-page">
            <Header />
            <main className="error-main">
                <section className="error-container">
                    <div className="error-content">
                        <img src={errorIcon} alt="Error" className="error-icon" />
                        <h2 className="error-title">{title}</h2>
                        <p className="error-message">{message}</p>
                        <Button variant="primary" size="md" className="error-btn" onClick={handleGoHome}>
                            {actionText}
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
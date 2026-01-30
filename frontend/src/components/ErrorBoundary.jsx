import React from "react";
import ErrorPage from "../pages/Error/ErrorPage.jsx";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    handleGoHome = () => {
        window.location.href = "/";
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorPage
                    onAction={() => (window.location.href = "/")}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
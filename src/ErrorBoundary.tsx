import React from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        console.error("🔥 Error caught by ErrorBoundary:", error);
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Error details:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Terjadi kesalahan pada aplikasi. Silakan coba lagi.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

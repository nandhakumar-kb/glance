/**
 * Error Boundary Component
 * Catches JavaScript errors in child component tree and displays fallback UI.
 * Provides recovery options with try again and home navigation.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';
import '../styles/ErrorBoundary.css';

/**
 * Error boundary for graceful error handling
 * @class ErrorBoundary
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-container">
                    <div className="error-boundary-content">
                        <h1 className="error-boundary-title">Oops!</h1>
                        <p className="error-boundary-text">
                            Something went wrong. We're sorry for the inconvenience.
                        </p>
                        <div className="error-boundary-actions">
                            <button
                                onClick={this.handleReset}
                                className="error-boundary-btn error-boundary-btn-primary"
                            >
                                <RefreshCw size={18} /> Try Again
                            </button>
                            <Link
                                to="/"
                                className="error-boundary-btn error-boundary-btn-secondary"
                            >
                                <Home size={18} /> Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

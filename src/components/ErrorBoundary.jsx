import React from 'react';
import { Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

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
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-color)',
                    padding: '2rem'
                }}>
                    <div style={{
                        textAlign: 'center',
                        maxWidth: '500px'
                    }}>
                        <h1 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: 'var(--text-primary)'
                        }}>Oops!</h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '2rem',
                            fontSize: '1.1rem'
                        }}>
                            Something went wrong. We're sorry for the inconvenience.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={this.handleReset}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'var(--accent-blue)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}
                            >
                                <RefreshCw size={18} /> Try Again
                            </button>
                            <Link
                                to="/"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}
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

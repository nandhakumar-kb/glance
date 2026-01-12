/**
 * 404 Not Found Page Component
 * User-friendly error page with auto-redirect countdown.
 * Provides navigation options back to home or previous page.
 */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { TIMINGS } from '../constants';
import '../styles/NotFound.css';

/**
 * 404 error page with auto-redirect
 * @returns {React.Component} Not found page component
 */
const NotFound = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(TIMINGS.REDIRECT_COUNTDOWN / 1000);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, TIMINGS.COUNTDOWN_INTERVAL);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-animation">
                    <h1 className="not-found-title">404</h1>
                    <div className="floating-books">
                        <span className="book-icon">📚</span>
                        <span className="book-icon">📖</span>
                        <span className="book-icon">📕</span>
                    </div>
                </div>
                <h2 className="not-found-subtitle">Oops! Page Not Found</h2>
                <p className="not-found-text">
                    The page you're looking for seems to have wandered off into the library...
                </p>
                <p className="countdown-text">
                    Redirecting to home in <strong>{countdown}</strong> seconds
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn primary">
                        <Home size={20} /> Back to Home
                    </Link>
                    <Link to="/#collection" className="not-found-btn secondary">
                        <Search size={20} /> Browse Books
                    </Link>
                    <button onClick={() => navigate(-1)} className="not-found-btn tertiary">
                        <ArrowLeft size={20} /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

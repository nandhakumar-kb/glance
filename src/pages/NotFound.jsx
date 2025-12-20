import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-text">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn primary">
                        <Home size={20} /> Back to Home
                    </Link>
                    <Link to="/#collection" className="not-found-btn secondary">
                        <Search size={20} /> Browse Books
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

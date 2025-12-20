import React from 'react';
import './LoadingCard.css';

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <div className="loading-image shimmer"></div>
            <div className="loading-content">
                <div className="loading-title shimmer"></div>
                <div className="loading-author shimmer"></div>
                <div className="loading-buttons">
                    <div className="loading-button shimmer"></div>
                    <div className="loading-button shimmer"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingCard;

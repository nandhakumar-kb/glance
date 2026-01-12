/**
 * Skeleton Loader Components
 * Placeholder loading skeletons for improved perceived performance.
 * Provides skeletons for cards, grids, search, and hero sections.
 */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components.css';

/**
 * Single product card skeleton
 * @returns {React.Component} Skeleton placeholder for product card
 */
export const SkeletonCard = () => (
    <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-author"></div>
            <div className="skeleton-buttons">
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
            </div>
        </div>
    </div>
);

/**
 * Grid of skeleton cards
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeleton cards to display
 * @returns {React.Component} Grid of skeleton cards
 */
export const SkeletonGrid = ({ count = 6 }) => (
    <div className="product-grid">
        {[...Array(count)].map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
);

SkeletonGrid.propTypes = {
    count: PropTypes.number,
};

SkeletonGrid.defaultProps = {
    count: 6,
};

/**
 * Search bar skeleton
 * @returns {React.Component} Skeleton placeholder for search input
 */
export const SearchSkeleton = () => (
    <div className="search-skeleton">
        <div className="skeleton-search-bar"></div>
    </div>
);

/**
 * Hero section skeleton
 * @returns {React.Component} Skeleton placeholder for hero section
 */
export const HeroSkeleton = () => (
    <div className="hero-skeleton">
        <div className="hero-skeleton-content">
            <div className="skeleton-badge"></div>
            <div className="skeleton-hero-title"></div>
            <div className="skeleton-hero-text"></div>
            <div className="skeleton-cta"></div>
        </div>
        <div className="hero-skeleton-image"></div>
    </div>
);

export default SkeletonCard;

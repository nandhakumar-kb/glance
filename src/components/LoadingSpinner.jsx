/**
 * Loading Spinner Components
 * Collection of loading indicators for different use cases.
 * Includes full-page spinner, inline loader, and button loader.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';
import '../styles/components.css';

/**
 * Full-page loading spinner with optional text
 * @param {Object} props - Component props
 * @param {'small'|'medium'|'large'} props.size - Spinner size
 * @param {string} props.text - Loading message text
 * @returns {React.Component} Loading spinner
 */
export const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
    const sizeClasses = {
        small: 'spinner-small',
        medium: 'spinner-medium',
        large: 'spinner-large'
    };

    return (
        <div className="loading-spinner-container">
            <div className={`loading-spinner ${sizeClasses[size]}`}>
                <Loader2 className="spinner-icon" />
            </div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

/**
 * Inline animated dot loader
 * @returns {React.Component} Three-dot loader animation
 */
export const InlineLoader = () => (
    <div className="inline-loader">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
    </div>
);

/**
 * Button loading indicator
 * @returns {React.Component} Small spinner for button states
 */
export const ButtonLoader = () => (
    <div className="button-loader">
        <Loader2 className="button-loader-icon" size={18} />
    </div>
);

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    text: PropTypes.string,
};

LoadingSpinner.defaultProps = {
    size: 'medium',
    text: 'Loading...',
};

export default LoadingSpinner;

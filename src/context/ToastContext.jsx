/**
 * Toast Context Provider
 * Manages global toast notification system with automatic removal.
 * Provides showToast function for displaying notifications throughout the app.
 */
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '../components/Toast';

const ToastContext = createContext();

/**
 * Custom hook to access toast functionality
 * @returns {{showToast: Function}} Toast context with showToast method
 * @throws {Error} If used outside ToastProvider
 */
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

/**
 * Toast Provider Component
 * Wraps app with toast notification system
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.Component} Provider with toast container
 */
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    /**
     * Display a toast notification
     * @param {string} message - Message to display
     * @param {'success'|'error'|'info'} type - Toast type
     * @param {number} duration - Display duration in milliseconds
     */
    const showToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

ToastProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

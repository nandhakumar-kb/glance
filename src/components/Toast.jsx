/**
 * Toast Notification Component
 * Auto-dismissing notification with type-specific icons and styling.
 * Supports success, error, and info types.
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import '../styles/components.css';

/**
 * Toast notification with auto-dismiss
 * @param {Object} props - Component props
 * @param {string} props.message - Notification message
 * @param {'success'|'error'|'info'} props.type - Notification type
 * @param {Function} props.onClose - Callback when toast is closed
 * @param {number} props.duration - Display duration in milliseconds
 * @returns {React.Component} Toast notification
 */
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <CheckCircle size={20} />,
        error: <XCircle size={20} />,
        info: <Info size={20} />
    };

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-icon">{icons[type]}</div>
            <span className="toast-message">{message}</span>
            <button onClick={onClose} className="toast-close">
                <X size={18} />
            </button>
        </div>
    );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'info']),
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
};

Toast.defaultProps = {
    type: 'success',
    duration: 3000,
};

export default Toast;

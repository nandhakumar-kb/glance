/**
 * Empty State Component
 * Displays contextual empty states with icons and optional actions.
 * Provides default content for common scenarios (search, favorites, errors).
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Search, Heart, ShoppingBag, BookOpen, AlertCircle } from 'lucide-react';
import '../styles/components.css';

/**
 * Empty state display with customizable content
 * @param {Object} props - Component props
 * @param {'search'|'favorites'|'products'|'books'|'error'} props.type - Empty state type
 * @param {string} [props.title] - Custom title (uses default if not provided)
 * @param {string} [props.description] - Custom description (uses default if not provided)
 * @param {React.ReactNode} [props.action] - Optional action button or element
 * @param {React.Component} [props.icon] - Custom icon component
 * @returns {React.Component} Empty state display
 */
const EmptyState = ({
    type = 'search',
    title,
    description,
    action,
    icon: CustomIcon
}) => {
    const icons = {
        search: Search,
        favorites: Heart,
        products: ShoppingBag,
        books: BookOpen,
        error: AlertCircle
    };

    const Icon = CustomIcon || icons[type] || Search;

    const defaultContent = {
        search: {
            title: 'No results found',
            description: 'Try adjusting your search terms or browse all items'
        },
        favorites: {
            title: 'No favorites yet',
            description: 'Start adding books to your favorites to see them here'
        },
        products: {
            title: 'No products available',
            description: 'Check back soon for new products'
        },
        books: {
            title: 'No books available',
            description: 'The collection is being updated'
        },
        error: {
            title: 'Something went wrong',
            description: 'Please try again later'
        }
    };

    const content = {
        title: title || defaultContent[type]?.title || 'No items found',
        description: description || defaultContent[type]?.description || ''
    };

    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <Icon size={64} />
            </div>
            <h2 className="empty-state-title">{content.title}</h2>
            <p className="empty-state-description">{content.description}</p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="empty-state-action"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
};

EmptyState.propTypes = {
    type: PropTypes.oneOf(['search', 'favorites', 'products', 'books', 'error']),
    title: PropTypes.string,
    description: PropTypes.string,
    action: PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    }),
    icon: PropTypes.elementType,
};

EmptyState.defaultProps = {
    type: 'search',
};

export default EmptyState;

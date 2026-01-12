/**
 * Product Card Component
 * Displays book information with favorite, share, and purchase options.
 * Supports lazy loading images and external redirect links.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useShare } from '../hooks/useShare';

/**
 * Book product card with interactive features
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data object
 * @param {string} props.product.title - Book title
 * @param {string} props.product.author - Book author
 * @param {string} props.product.image - Cover image URL
 * @param {string} props.product.affiliateLinkIN - India purchase link
 * @param {string} props.product.affiliateLinkUS - USA purchase link
 * @param {string} [props.product.redirectUrl] - Optional external redirect link
 * @param {boolean} props.isFavorite - Whether book is favorited
 * @param {Function} props.onToggleFavorite - Callback for favorite toggle
 * @returns {React.Component} Product card component
 */
const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
    const { showToast } = useToast();
    const { share, isSharing } = useShare(showToast);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleShare = async () => {
        await share({
            title: product.title,
            text: `Check out "${product.title}" by ${product.author}`,
            url: window.location.href
        });
    };

    const handleFavoriteClick = () => {
        onToggleFavorite();
        showToast(
            isFavorite ? 'Removed from favorites' : 'Added to favorites',
            'success'
        );
    };

    const handleImageClick = () => {
        if (product.redirectUrl) {
            window.open(product.redirectUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <article className="product-card" role="article" aria-label={`${product.title} by ${product.author}`}>
            <div className="card-actions-top">
                <button
                    onClick={handleFavoriteClick}
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    aria-pressed={isFavorite}
                >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button
                    onClick={handleShare}
                    className="share-btn"
                    aria-label="Share book"
                    disabled={isSharing}
                >
                    <Share2 size={18} />
                </button>
            </div>
            <div
                className="image-container"
                style={{ cursor: product.redirectUrl ? 'pointer' : 'default' }}
                onClick={handleImageClick}
            >
                {!imageLoaded && !imageError && <div className="image-skeleton" />}
                <img
                    src={imageError ? 'https://via.placeholder.com/128x200/1a1a1a/666666?text=Cover+Unavailable' : product.image}
                    alt={`${product.title} book cover`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    style={{
                        opacity: imageLoaded ? 1 : 0,
                        cursor: product.redirectUrl ? 'pointer' : 'default',
                        pointerEvents: 'auto'
                    }}
                />
            </div>
            <div className="card-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-author">by {product.author}</p>

                <div className="button-group">
                    <a
                        href={product.affiliateLinkIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-in"
                        aria-label={`Buy ${product.title} in India`}
                    >
                        🇮🇳 Buy in India
                    </a>
                    <a
                        href={product.affiliateLinkUS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-us"
                        aria-label={`Buy ${product.title} in USA`}
                    >
                        🇺🇸 Buy in USA
                    </a>
                </div>
            </div>
        </article>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        image: PropTypes.string,
        affiliateLinkIN: PropTypes.string,
        affiliateLinkUS: PropTypes.string,
        redirectUrl: PropTypes.string,
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};

export default ProductCard;

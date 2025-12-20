import React, { useState } from 'react';
import { Heart, Share2, Check } from 'lucide-react';
import { useToast } from './context/ToastContext';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
    const { showToast } = useToast();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: product.title,
            text: `Check out "${product.title}" by ${product.author}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(`${product.title} by ${product.author} - ${window.location.href}`);
                showToast('Link copied to clipboard!', 'success');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                showToast('Could not share', 'error');
            }
        }
    };

    const handleFavoriteClick = () => {
        onToggleFavorite();
        showToast(
            isFavorite ? 'Removed from favorites' : 'Added to favorites',
            'success'
        );
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
                >
                    <Share2 size={18} />
                </button>
            </div>
            <div className="image-container">
                {!imageLoaded && <div className="image-skeleton shimmer"></div>}
                <img 
                    src={product.image} 
                    alt={`${product.title} book cover`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
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

export default ProductCard;

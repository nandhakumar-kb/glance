import React from 'react';
import { Heart, Share2, Check } from 'lucide-react';
import { useToast } from './context/ToastContext';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
    const { showToast } = useToast();
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const handleShare = async () => {
        const bookUrl = window.location.href;
        const bookText = `Check out "${product.title}" by ${product.author}`;
        
        const shareData = {
            title: product.title,
            text: bookText,
            url: bookUrl
        };

        try {
            // Try native share first (works great on mobile)
            if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                await navigator.share(shareData);
            } else {
                // Desktop or unsupported: show platform-specific options
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(bookText + ' ' + bookUrl)}`;
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(bookUrl)}&text=${encodeURIComponent(bookText)}`;
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(bookText)}&url=${encodeURIComponent(bookUrl)}`;
                
                // For simplicity, copy to clipboard and show toast with platforms
                await navigator.clipboard.writeText(`${bookText} - ${bookUrl}`);
                showToast('Link copied! Share on WhatsApp, Telegram, or Twitter', 'success');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                // Fallback: just copy to clipboard
                try {
                    await navigator.clipboard.writeText(`${bookText} - ${bookUrl}`);
                    showToast('Link copied to clipboard!', 'success');
                } catch {
                    showToast('Could not share', 'error');
                }
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
                    style={{ opacity: imageLoaded ? 1 : 0 }}
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

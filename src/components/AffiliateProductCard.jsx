import React from 'react';
import { Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AffiliateProductCard = ({ product }) => {
    const { showToast } = useToast();
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const handleShare = async () => {
        const productUrl = window.location.href;
        const productText = `Check out "${product.title}"${product.price ? ` - ${product.price}` : ''}`;
        
        const shareData = {
            title: product.title,
            text: productText,
            url: productUrl
        };

        try {
            if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${productText} - ${productUrl}`);
                showToast('Link copied! Share on WhatsApp, Telegram, or Twitter', 'success');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                try {
                    await navigator.clipboard.writeText(`${productText} - ${productUrl}`);
                    showToast('Link copied to clipboard!', 'success');
                } catch {
                    showToast('Could not share', 'error');
                }
            }
        }
    };

    return (
        <article className="product-card" role="article" aria-label={product.title}>
            <div className="card-actions-top">
                <button
                    onClick={handleShare}
                    className="share-btn"
                    aria-label="Share product"
                >
                    <Share2 size={18} />
                </button>
            </div>
            <div className="image-container">
                {!imageLoaded && !imageError && <div className="image-skeleton" />}
                <img 
                    src={imageError ? 'https://via.placeholder.com/128x200/1a1a1a/666666?text=Product+Image' : product.image}
                    alt={product.title}
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
                {product.description && (
                    <p className="product-author">{product.description}</p>
                )}
                {product.price && (
                    <p className="product-price-tag">{product.price}</p>
                )}

                <div className="button-group">
                    <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        aria-label={`Buy ${product.title}`}
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </article>
    );
};

export default AffiliateProductCard;

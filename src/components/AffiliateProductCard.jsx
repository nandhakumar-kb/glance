import React, { useState } from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const AffiliateProductCard = ({ product }) => {
    const { showToast } = useToast();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleShare = async () => {
        const productUrl = window.location.href;
        const productText = `Check out "${product.title}" - ${product.price}`;
        
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
                showToast('Link copied to clipboard!', 'success');
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

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                {!imageLoaded && (
                    <div className="image-skeleton">
                        <div className="skeleton-shimmer"></div>
                    </div>
                )}
                {imageError ? (
                    <div className="image-error">
                        <span>📦</span>
                        <p>Image unavailable</p>
                    </div>
                ) : (
                    <img 
                        src={product.image} 
                        alt={product.title}
                        className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}
                
                <button 
                    className="share-btn"
                    onClick={handleShare}
                    aria-label="Share product"
                >
                    <Share2 size={18} />
                </button>

                {product.category && (
                    <span className="product-category">{product.category}</span>
                )}
            </div>

            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                {product.description && (
                    <p className="product-description">{product.description}</p>
                )}
                {product.price && (
                    <p className="product-price">{product.price}</p>
                )}

                <a 
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="affiliate-btn"
                >
                    <ExternalLink size={18} />
                    <span>View Product</span>
                </a>
            </div>
        </div>
    );
};

export default AffiliateProductCard;

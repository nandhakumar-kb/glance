/**
 * Affiliate Product Card Component
 * Displays affiliate products with share functionality and purchase link.
 * Optimized for product recommendations and external offers.
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useShare } from '../hooks/useShare';

/**
 * Affiliate product display card
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data object
 * @param {string} props.product.title - Product title
 * @param {string} props.product.image - Product image URL
 * @param {string} [props.product.description] - Product description
 * @param {string} [props.product.price] - Product price
 * @param {string} props.product.affiliateLink - Purchase link
 * @returns {React.Component} Affiliate product card
 */
const AffiliateProductCard = ({ product, priority = false }) => {
    const { showToast } = useToast();
    const { share, isSharing } = useShare(showToast);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(priority);
    const imageRef = useRef(null);

    // Intersection Observer for efficient lazy loading
    useEffect(() => {
        if (priority || shouldLoad) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px',
                threshold: 0.01
            }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => observer.disconnect();
    }, [priority, shouldLoad]);

    const handleShare = async () => {
        await share({
            title: product.title,
            text: `Check out "${product.title}"${product.price ? ` - ${product.price}` : ''}`,
            url: window.location.href
        });
    };

    return (
        <article className="product-card affiliate-card" role="article" aria-label={product.title}>
            <div className="card-actions-top">
                {product.category && (
                    <span className="category-badge">{product.category}</span>
                )}
                <button
                    onClick={handleShare}
                    className="share-btn"
                    aria-label="Share product"
                    disabled={isSharing}
                >
                    <Share2 size={18} />
                </button>
            </div>
            <div className="image-container" ref={imageRef}>
                {!imageLoaded && !imageError && <div className="image-skeleton" />}
                {shouldLoad && (
                    <img
                        src={imageError ? 'https://via.placeholder.com/300x300/1a1a1a/666666?text=Product' : product.image}
                        alt={product.title}
                        width="300"
                        height="300"
                        fetchpriority={priority ? 'high' : 'auto'}
                        decoding="async"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => {
                            setImageError(true);
                            setImageLoaded(true);
                        }}
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                    />
                )}
            </div>
            <div className="card-content">
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
                    className="btn btn-primary buy-now-btn"
                    aria-label={`Buy ${product.title}`}
                >
                    Buy Now →
                </a>
            </div>
        </article>
    );
};

AffiliateProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.string,
        affiliateLink: PropTypes.string.isRequired,
        category: PropTypes.string,
    }).isRequired,
    priority: PropTypes.bool,
};

export default AffiliateProductCard;

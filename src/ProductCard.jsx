import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>
            <div className="card-content">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-author">{product.author}</p>

                <div className="button-group">
                    <a
                        href={product.affiliateLinkIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-in"
                    >
                        🇮🇳 Buy in India
                    </a>
                    <a
                        href={product.affiliateLinkUS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-us"
                    >
                        🇺🇸 Buy in USA
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

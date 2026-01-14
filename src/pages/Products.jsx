/**
 * Products Page Component
 * Displays affiliate products with search and category filtering.
 * Shows product cards with affiliate purchase links.
 */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../components/AffiliateProductCard';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { SkeletonGrid } from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { TIMINGS, CATEGORIES } from '../constants';
import { updateSEO, generateCollectionStructuredData, generateBreadcrumbs } from '../utils/seo';
import '../styles/Products.css';

/**
 * Affiliate products listing page
 * @param {Object} props - Component props
 * @param {Array} props.affiliateProducts - Array of affiliate product objects
 * @returns {React.Component} Products page component
 */
function Products({ affiliateProducts = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
    const [isLoading, setIsLoading] = useState(true);

    // Get unique categories
    const categories = useMemo(() => {
        return [CATEGORIES.ALL, ...new Set(affiliateProducts.map(p => p.category))];
    }, [affiliateProducts]);

    // SEO: Update meta tags for products page
    useEffect(() => {
        updateSEO({
            title: 'Curated Products - Premium Items for Book Lovers | GlanceRead',
            description: 'Discover handpicked premium products carefully curated for book lovers and avid readers. Shop quality items including book accessories, reading essentials, and productivity tools.',
            keywords: 'book accessories, reading products, premium book products, book lover gifts, reading essentials, bookmarks, book lights, reading accessories',
            canonical: 'https://glanceread.vercel.app/products',
            structuredData: generateCollectionStructuredData(affiliateProducts, 'Curated Products for Book Lovers')
        });

        // Add breadcrumbs
        const breadcrumbs = generateBreadcrumbs([
            { name: 'Home', url: 'https://glanceread.vercel.app/' },
            { name: 'Products', url: 'https://glanceread.vercel.app/products' }
        ]);

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'breadcrumb-data';
        script.textContent = JSON.stringify(breadcrumbs);
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('breadcrumb-data');
            if (existing) existing.remove();
        };
    }, [affiliateProducts]);

    // Initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, TIMINGS.PRODUCTS_LOADING_DELAY);
        return () => clearTimeout(timer);
    }, []);

    // Filter products based on search and category with useMemo
    const filteredProducts = useMemo(() => {
        let filtered = affiliateProducts;

        // Filter by category
        if (selectedCategory !== CATEGORIES.ALL) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    }, [searchQuery, selectedCategory, affiliateProducts]);

    return (
        <div className="products-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="back-btn" aria-label="Back to home">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="header-title">
                        <h1 className="logo">Recommended Products</h1>
                        <p className="header-subtitle">Curated selections just for you</p>
                    </div>
                </div>
            </header>

            {/* Search and Filter Section */}
            <div className="search-container">
                <div className="search-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                {/* Category Filter */}
                <div className="category-filter">
                    <Filter size={18} />
                    <div className="category-buttons">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="results-info">
                <p>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <SkeletonGrid count={4} />
            ) : filteredProducts.length > 0 ? (
                <div className="products-grid product-grid">
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="product-card-wrapper"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <AffiliateProductCard product={product} priority={index < 4} />
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    type="products"
                    title="No products found"
                    description="Try adjusting your search or browse all categories"
                />
            )}

            {/* Footer */}
            <footer className="footer">
                <p>Find amazing products and support us through affiliate links!</p>
            </footer>
        </div>
    );
}

Products.propTypes = {
    affiliateProducts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            category: PropTypes.string,
        })
    ),
};

Products.defaultProps = {
    affiliateProducts: [],
};

export default Products;

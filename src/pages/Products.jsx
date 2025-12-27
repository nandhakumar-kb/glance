import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../components/AffiliateProductCard';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import '../index.css';

function Products({ affiliateProducts = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState(affiliateProducts);

    // Get unique categories
    const categories = ['All', ...new Set(affiliateProducts.map(p => p.category))];

    // Filter products based on search and category
    useEffect(() => {
        let filtered = affiliateProducts;

        // Filter by category
        if (selectedCategory !== 'All') {
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

        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, affiliateProducts]);

    return (
        <div className="home-container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="back-btn" aria-label="Back to home">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="logo">Affiliate Products</h1>
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
            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <AffiliateProductCard 
                            key={product.id} 
                            product={product}
                        />
                    ))
                ) : (
                    <div className="no-results">
                        <h2>No products found</h2>
                        <p>Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="footer">
                <p>Find amazing products and support us through affiliate links!</p>
            </footer>
        </div>
    );
}

export default Products;

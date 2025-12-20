import React, { useState } from 'react';
import ProductCard from '../ProductCard';
import '../index.css';
import { Link } from 'react-router-dom';

function Home({ products }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product => {
        const query = searchQuery.toLowerCase();
        return (
            product.title.toLowerCase().includes(query) ||
            product.author.toLowerCase().includes(query)
        );
    });

    return (
        <div className="app-container">
            <nav className="header">
                <div className="header-content">
                    <div className="header-logo">
                        <img src="/logo.png" alt="GlanceRead" />
                        <span className="logo-text">
                            <span className="logo-glance">Glance</span>
                            <span className="logo-read">Read</span>
                        </span>
                    </div>
                    <Link to="/admin" className="admin-link">Admin</Link>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">Curated Collection</div>
                    <h1>Premium Reads</h1>
                    <p>Discover the books that shape successful minds. Handpicked for your personal growth and library.</p>
                    <a href="#collection" className="hero-cta">
                        Explore Collection →
                    </a>
                </div>
                <div className="hero-image">
                    <img src="/hero.png" alt="Curated Collection" />
                </div>
            </header>

            <div className="search-section">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                </div>
                {searchQuery && (
                    <div className="search-results-info">
                        <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'book' : 'books'} found</span>
                    </div>
                )}
            </div>

            <main className="products-section">
                <div id="collection" className="section-header">
                    <h2>Book Collection</h2>
                    <span className="book-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'Book' : 'Books'}</span>
                </div>
                {filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No books found</h3>
                        <p>Try searching with different keywords</p>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>© 2026 glanceread. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;

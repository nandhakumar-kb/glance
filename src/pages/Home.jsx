import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import LoadingCard from '../components/LoadingCard';
import '../index.css';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

function Home({ products, favorites, toggleFavorite }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Search suggestions
    useEffect(() => {
        if (searchQuery.length > 1) {
            const suggestions = products
                .filter(p => 
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.author.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5)
                .map(p => p.title);
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [searchQuery, products]);

    // Filter and sort products
    const getFilteredAndSortedProducts = () => {
        let filtered = products.filter(product => {
            const query = searchQuery.toLowerCase();
            return (
                product.title.toLowerCase().includes(query) ||
                product.author.toLowerCase().includes(query)
            );
        });

        // Sort logic
        switch (sortBy) {
            case 'title-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'author':
                filtered.sort((a, b) => a.author.localeCompare(b.author));
                break;
            case 'favorites':
                filtered = filtered.filter(p => favorites.includes(p.id));
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredAndSortedProducts();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

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
                    <div className="header-nav">
                        <Link to="/admin" className="admin-link">Admin</Link>
                    </div>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge" role="status">Curated Collection</div>
                    <h1>Premium Reads</h1>
                    <p>Discover the books that shape successful minds. Handpicked for your personal growth and library.</p>
                    <a href="#collection" className="hero-cta">
                        Explore Collection →
                    </a>
                </div>
                <div className="hero-image">
                    <img src="/hero.png" alt="Curated book collection showcase" loading="eager" />
                </div>
            </header>

            <div className="search-section">
                <div className="search-container">
                    <div className="search-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="search-bar"
                            aria-label="Search books"
                        />
                        {showSuggestions && searchSuggestions.length > 0 && (
                            <div className="search-suggestions">
                                {searchSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
                    <div className="section-controls">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-dropdown"
                            aria-label="Sort books"
                        >
                            <option value="default">Default Order</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                            <option value="author">Author</option>
                            <option value="favorites">Favorites Only</option>
                        </select>
                        <span className="book-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'Book' : 'Books'}</span>
                    </div>
                </div>
                {isLoading ? (
                    <div className="product-grid">
                        {[...Array(6)].map((_, index) => (
                            <LoadingCard key={index} />
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="product-grid">
                        {filteredProducts.map((product, index) => (
                            <div 
                                key={product.id} 
                                className="product-card-wrapper"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <ProductCard 
                                    product={product} 
                                    isFavorite={favorites.includes(product.id)}
                                    onToggleFavorite={() => toggleFavorite(product.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No books found</h3>
                        <p>Try searching with different keywords or adjust your filters</p>
                    </div>
                )}
            </main>

            <footer className="footer">
                <p>© 2026 glanceread. All rights reserved.</p>
                <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', marginLeft: '1rem' }}>
                    Contact Us
                </Link>
            </footer>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button 
                    onClick={scrollToTop} 
                    className="scroll-to-top"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} />
                </button>
            )}
        </div>
    );
}

export default Home;

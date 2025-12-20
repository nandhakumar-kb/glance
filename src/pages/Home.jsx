import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard';
import '../index.css';
import { Link } from 'react-router-dom';
import { ArrowUp, Share2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

function Home({ products, favorites, toggleFavorite }) {
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

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

    // Filter products
    const getFilteredProducts = () => {
        return products.filter(product => {
            const query = searchQuery.toLowerCase();
            return (
                product.title.toLowerCase().includes(query) ||
                product.author.toLowerCase().includes(query)
            );
        });
    };

    const filteredProducts = getFilteredProducts();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
    };

    const handleShareWebsite = async () => {
        const shareData = {
            title: 'GlanceRead - Premium Books for Personal Growth',
            text: 'Check out this amazing collection of curated books!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!', 'success');
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                showToast('Could not share', 'error');
            }
        }
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const swipeDistance = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(swipeDistance) > threshold) {
            // Swipe detected - can be used for navigation or actions
            if (swipeDistance > 0) {
                // Swiped left
            } else {
                // Swiped right
            }
        }
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
                        <button 
                            onClick={handleShareWebsite}
                            className="share-website-btn"
                            aria-label="Share this website"
                        >
                            <Share2 size={18} /> Share
                        </button>
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
                        <span className="book-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'Book' : 'Books'}</span>
                    </div>
                </div>
                {filteredProducts.length > 0 ? (
                    <div 
                        className="product-grid"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
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
                <div className="footer-content">
                    <div className="affiliate-disclosure">
                        <p className="disclosure-title">📢 Affiliate Disclosure</p>
                        <p className="disclosure-text">
                            As an Amazon Associate, we earn from qualifying purchases. When you click on book links and make a purchase, 
                            we may receive a small commission at no extra cost to you. This helps us maintain and improve our service. 
                            Thank you for your support!
                        </p>
                    </div>
                    <div className="footer-links">
                        <p>© 2026 GlanceRead. All rights reserved.</p>
                        <div className="footer-social">
                            <button onClick={handleShareWebsite} className="footer-share-btn" aria-label="Share GlanceRead">
                                <Share2 size={16} /> Share Website
                            </button>
                        </div>
                    </div>
                </div>
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

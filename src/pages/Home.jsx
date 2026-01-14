/**
 * Home Page Component
 * Main landing page displaying book collection with search, filtering, and favorites.
 * Features hero section, search with suggestions, sorting, and social links.
 */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUp, Share2, Linkedin, Instagram, ShoppingBag } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useShare } from '../hooks/useShare';
import { SkeletonGrid } from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { TIMINGS, UI_THRESHOLDS, SORT_OPTIONS } from '../constants';
import { updateSEO, generateCollectionStructuredData, generateBreadcrumbs } from '../utils/seo';

/**
 * Home page with book collection and interactive features
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of book products
 * @param {Array} props.favorites - Array of favorited product IDs
 * @param {Function} props.toggleFavorite - Callback to toggle favorite status
 * @returns {React.Component} Home page component
 */
function Home({ products, favorites, toggleFavorite }) {
    const { showToast } = useToast();
    const { share, isSharing } = useShare(showToast);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    const [sortBy, setSortBy] = useState(SORT_OPTIONS.DEFAULT);
    const [isLoading, setIsLoading] = useState(true);

    // SEO: Update meta tags and structured data
    useEffect(() => {
        updateSEO({
            title: 'GlanceRead - Discover Premium Books for Personal Growth & Success | Best Book Recommendations',
            description: 'Discover handpicked premium books that shape successful minds. Get curated book recommendations in productivity, finance, self-help, business, and personal development. Build your ideal library with expert-selected bestsellers.',
            keywords: 'premium books, book recommendations, best books, personal growth books, productivity books, finance books, self-help books, business books, bestselling books, book collection, reading list, must-read books, success books, self-improvement',
            canonical: 'https://glanceread.vercel.app/',
            structuredData: generateCollectionStructuredData(products, 'Premium Book Collection')
        });

        // Add breadcrumbs
        const breadcrumbs = generateBreadcrumbs([
            { name: 'Home', url: 'https://glanceread.vercel.app/' }
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
    }, [products]);

    // Initial loading simulation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, TIMINGS.LOADING_DELAY);
        return () => clearTimeout(timer);
    }, []);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, TIMINGS.SEARCH_DEBOUNCE);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > UI_THRESHOLDS.SCROLL_TO_TOP_THRESHOLD);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Generate search suggestions based on current query
    useEffect(() => {
        // Only show suggestions if query meets minimum length
        if (searchQuery.length >= UI_THRESHOLDS.MIN_SEARCH_LENGTH) {
            const suggestions = products
                // Match against title or author
                .filter(p =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.author.toLowerCase().includes(searchQuery.toLowerCase())
                )
                // Limit to maximum suggestions
                .slice(0, UI_THRESHOLDS.MAX_SUGGESTIONS)
                // Extract just the titles for display
                .map(p => p.title);
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [searchQuery, products]);

    // Memoized filtering and sorting for performance optimization
    const filteredProducts = useMemo(() => {
        // First, filter by search query (uses debounced query for smooth UX)
        let filtered = products.filter(product => {
            const query = debouncedQuery.toLowerCase();
            return (
                product.title.toLowerCase().includes(query) ||
                product.author.toLowerCase().includes(query)
            );
        });

        // Then, apply sorting based on user selection
        switch (sortBy) {
            case SORT_OPTIONS.TITLE:
                // Alphabetical sort by title
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case SORT_OPTIONS.AUTHOR:
                // Alphabetical sort by author
                filtered.sort((a, b) => a.author.localeCompare(b.author));
                break;
            default:
                // Keep original order (default)
                break;
        }

        return filtered;
    }, [products, debouncedQuery, sortBy]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
    };

    /**
     * Handle keyboard navigation for search suggestions
     * Supports arrow keys for navigation and Enter to select
     */
    const handleKeyDown = (e) => {
        if (!showSuggestions || searchSuggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedSuggestion(prev =>
                    prev < searchSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedSuggestion >= 0) {
                    handleSuggestionClick(searchSuggestions[selectedSuggestion]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedSuggestion(-1);
                break;
            default:
                break;
        }
    };

    const handleShareWebsite = async () => {
        await share({
            title: 'GlanceRead - Premium Books for Personal Growth',
            text: 'Check out this amazing collection of curated books!',
            url: window.location.href
        });
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
                        <div className="social-links">
                            <a href="https://in.pinterest.com/glanceread/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Pinterest">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/glanceread" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://www.instagram.com/glanceread/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.threads.com/@glanceread" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Threads">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.704-1.108 0-2.014-.414-2.698-1.23-.684-.817-1.028-1.917-1.028-3.3 0-1.385.345-2.484 1.028-3.301.684-.817 1.59-1.229 2.698-1.229 1.137 0 2.062.433 2.75 1.287.345.43.61.938.79 1.513.18-.575.445-1.083.79-1.513.688-.854 1.613-1.287 2.75-1.287 1.592 0 2.846.602 3.732 1.789.886 1.187 1.371 2.87 1.371 5.041 0 2.67-.698 4.776-2.074 6.258-1.556 1.676-3.857 2.531-6.84 2.531z" />
                                </svg>
                            </a>
                        </div>
                        <button
                            onClick={handleShareWebsite}
                            className="share-website-btn"
                            aria-label="Share this website"
                        >
                            <Share2 size={18} /> Share
                        </button>
                        <Link
                            to="/products"
                            className="products-link"
                            aria-label="View affiliate products"
                        >
                            <ShoppingBag size={18} /> Products
                        </Link>
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
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchQuery(value);
                                if (value.toLowerCase() === 'admin') {
                                    navigate('/admin');
                                }
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => {
                                setShowSuggestions(false);
                                setSelectedSuggestion(-1);
                            }, TIMINGS.SUGGESTION_BLUR_DELAY)}
                            onKeyDown={handleKeyDown}
                            className="search-bar"
                            aria-label="Search books"
                            aria-autocomplete="list"
                            aria-expanded={showSuggestions && searchSuggestions.length > 0}
                        />
                        {showSuggestions && searchSuggestions.length > 0 && (
                            <div className="search-suggestions" role="listbox">
                                {searchSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className={`suggestion-item ${selectedSuggestion === index ? 'selected' : ''}`}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        role="option"
                                        aria-selected={selectedSuggestion === index}
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
                            className="sort-select"
                            aria-label="Sort books"
                        >
                            <option value={SORT_OPTIONS.DEFAULT}>Default Order</option>
                            <option value={SORT_OPTIONS.TITLE}>Sort by Title</option>
                            <option value={SORT_OPTIONS.AUTHOR}>Sort by Author</option>
                        </select>
                        <span className="book-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'Book' : 'Books'}</span>
                    </div>
                </div>

                {isLoading ? (
                    <SkeletonGrid count={6} />
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
                                    priority={index < 4}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        type="search"
                        title="No books found"
                        description="Try searching with different keywords or browse all books"
                        action={{
                            label: 'Clear Search',
                            onClick: () => setSearchQuery('')
                        }}
                    />
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
                            <div className="social-links">
                                <a href="https://in.pinterest.com/glanceread/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Pinterest">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/company/glanceread" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                                    <Linkedin size={18} />
                                </a>
                                <a href="https://www.instagram.com/glanceread/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://www.threads.com/@glanceread" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Threads">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.704-1.108 0-2.014-.414-2.698-1.23-.684-.817-1.028-1.917-1.028-3.3 0-1.385.345-2.484 1.028-3.301.684-.817 1.59-1.229 2.698-1.229 1.137 0 2.062.433 2.75 1.287.345.43.61.938.79 1.513.18-.575.445-1.083.79-1.513.688-.854 1.613-1.287 2.75-1.287 1.592 0 2.846.602 3.732 1.789.886 1.187 1.371 2.87 1.371 5.041 0 2.67-.698 4.776-2.074 6.258-1.556 1.676-3.857 2.531-6.84 2.531z" />
                                    </svg>
                                </a>
                            </div>
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

Home.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
        })
    ).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};

export default Home;

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
                        <img src="/logo.png" alt="glanceread" />
                        <span>glanceread</span>
                    </div>
                    <Link to="/admin" className="admin-link">Admin</Link>
                </div>
            </nav>

            <header className="hero-section">
                <div className="hero-content">
                    <h1>Premium Reads</h1>
                    <p>Discover the books that shape successful minds. Handpicked for your personal growth and library.</p>
                </div>
                <div className="hero-image">
                    <img src="/hero.png" alt="Curated Collection" />
                </div>
            </header>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>

            <main className="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </main>

            <footer className="footer">
                <p>© 2026 glanceread. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;

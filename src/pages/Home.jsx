import React from 'react';
import ProductCard from '../ProductCard';
import '../index.css';
import { Link } from 'react-router-dom';

function Home({ products }) {
    return (
        <div className="app-container">
            <header className="hero-section">
                <div className="hero-content">
                    <img src="/logo.png" alt="Curated Essentials Logo" className="logo" />
                    <h1>Premium Reads</h1>
                    <p>Discover the books that shape successful minds. Handpicked for your personal growth and library.</p>
                </div>
                <div className="hero-image">
                    <img src="/hero.png" alt="Curated Collection" />
                </div>
            </header>

            <main className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </main>

            <footer className="footer">
                <p>© 2026 glanceread. All rights reserved.</p>
                <Link to="/admin" style={{ color: '#333', textDecoration: 'none', fontSize: '0.8rem', marginLeft: '10px' }}>Admin</Link>
            </footer>
        </div>
    );
}

export default Home;

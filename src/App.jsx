import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { products as initialProducts } from './ProductData';
import { affiliateProducts as initialAffiliateProducts } from './AffiliateProductData';
import './index.css';

function App() {
  // Force reset localStorage if it's corrupted or empty
  const BOOKS_VERSION = '1.2';
  const AFFILIATE_VERSION = '2.0'; // Incremented to force refresh on all devices
  
  const [products, setProducts] = useState(() => {
    const savedVersion = localStorage.getItem('booksVersion');
    const saved = localStorage.getItem('products');
    
    // If version mismatch or no products, reset to initial
    if (savedVersion !== BOOKS_VERSION || !saved) {
      console.log('Initializing books from ProductData');
      localStorage.setItem('booksVersion', BOOKS_VERSION);
      localStorage.setItem('products', JSON.stringify(initialProducts));
      return initialProducts;
    }
    
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse products", e);
    }
    
    // Fallback to initial products
    localStorage.setItem('products', JSON.stringify(initialProducts));
    return initialProducts;
  });

  const [affiliateProducts, setAffiliateProducts] = useState(() => {
    const savedVersion = localStorage.getItem('affiliateVersion');
    const saved = localStorage.getItem('affiliateProducts');
    
    if (savedVersion !== AFFILIATE_VERSION || !saved) {
      console.log('Initializing affiliate products from AffiliateProductData');
      localStorage.setItem('affiliateVersion', AFFILIATE_VERSION);
      localStorage.setItem('affiliateProducts', JSON.stringify(initialAffiliateProducts));
      return initialAffiliateProducts;
    }
    
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse affiliate products", e);
    }
    
    localStorage.setItem('affiliateProducts', JSON.stringify(initialAffiliateProducts));
    return initialAffiliateProducts;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Ensure products are never empty - reset to initial if needed
  useEffect(() => {
    if (!products || products.length === 0) {
      console.log('No products found, resetting to initial data');
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, [products]);

  // Save to local storage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Save affiliate products to localStorage
  useEffect(() => {
    localStorage.setItem('affiliateProducts', JSON.stringify(affiliateProducts));
  }, [affiliateProducts]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  products={products} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                />
              } 
            />
            <Route 
              path="/admin" 
              element={
                <Admin 
                  products={products} 
                  setProducts={setProducts}
                  affiliateProducts={affiliateProducts}
                  setAffiliateProducts={setAffiliateProducts}
                />
              } 
            />
            <Route 
              path="/products" 
              element={<Products affiliateProducts={affiliateProducts} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

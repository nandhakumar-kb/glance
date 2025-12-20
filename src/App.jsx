import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { products as initialProducts } from './ProductData';
import './index.css';

function App() {
  // Force reset localStorage if it's corrupted or empty
  const BOOKS_VERSION = '1.0';
  
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
              element={<Admin products={products} setProducts={setProducts} />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

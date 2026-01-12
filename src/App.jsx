/**
 * Main App Component
 * Manages application routing, product state, and localStorage synchronization.
 * Handles both books and affiliate products with version-controlled data persistence.
 */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { products as initialProducts } from './data/ProductData';
import { affiliateProducts as initialAffiliateProducts } from './data/AffiliateProductData';
import { STORAGE_KEYS } from './constants';
import { initVersionedStorage, getStorageItem, setStorageItem } from './utils/localStorage';

/**
 * Root application component
 * @returns {React.Component} Application router with all routes and providers
 */
function App() {
  // Initialize products state with version-controlled localStorage
  const [products, setProducts] = useState(() =>
    initVersionedStorage(
      STORAGE_KEYS.BOOKS,
      'booksVersion',
      STORAGE_KEYS.BOOKS_VERSION,
      initialProducts
    )
  );

  // Initialize affiliate products with version control
  const [affiliateProducts, setAffiliateProducts] = useState(() =>
    initVersionedStorage(
      STORAGE_KEYS.AFFILIATE_PRODUCTS,
      'affiliateVersion',
      STORAGE_KEYS.AFFILIATE_VERSION,
      initialAffiliateProducts
    )
  );

  // Initialize favorites from localStorage (no versioning needed)
  const [favorites, setFavorites] = useState(() =>
    getStorageItem(STORAGE_KEYS.FAVORITES, [])
  );

  // Persist products to localStorage on every change
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.BOOKS, products);
  }, [products]);

  // Persist affiliate products to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.AFFILIATE_PRODUCTS, affiliateProducts);
  }, [affiliateProducts]);

  // Persist favorites to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  /**
   * Toggle favorite status for a product
   * @param {number} productId - Product ID to toggle
   */
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      // Remove if already favorited, otherwise add
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

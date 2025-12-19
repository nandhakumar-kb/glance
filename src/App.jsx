import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { products as initialProducts } from './ProductData';
import './index.css';

function App() {
  const [products, setProducts] = useState(() => {
    // Initialize state from local storage or fallback to default data
    const saved = localStorage.getItem('products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse products from local storage", e);
      }
    }
    return initialProducts;
  });

  // Save to local storage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/admin" element={<Admin products={products} setProducts={setProducts} />} />
      </Routes>
    </Router>
  );
}

export default App;

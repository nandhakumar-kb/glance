import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus, Save, X, ArrowLeft, Lock, Eye, EyeOff, LogOut, Book, ShoppingBag } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import '../index.css';
import '../Admin.css';

function Admin({ products, setProducts, affiliateProducts, setAffiliateProducts }) {
    const { showToast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState('books'); // 'books' or 'affiliate'

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === 'admin123') {
            setIsAuthenticated(true);
            setLoginError('');
            showToast('Welcome to Admin Dashboard!', 'success');
        } else {
            setLoginError('Incorrect password. Please try again.');
            setPasswordInput('');
            showToast('Incorrect password', 'error');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPasswordInput('');
        showToast('Logged out successfully', 'success');
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="login-card">
                    <div className="login-header">
                        <Lock size={48} className="login-icon" />
                        <h1>Admin Access</h1>
                        <p>Enter your credentials to manage the book collection</p>
                    </div>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={passwordInput}
                                    onChange={(e) => {
                                        setPasswordInput(e.target.value);
                                        setLoginError('');
                                    }}
                                    placeholder="Enter your password"
                                    className={loginError ? 'error' : ''}
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {loginError && <span className="error-message">{loginError}</span>}
                        </div>
                        <button type="submit" className="login-button">
                            <Lock size={18} /> Login
                        </button>
                    </form>
                    <div className="login-footer">
                        <Link to="/" className="back-home-link">← Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    const startEdit = (product) => {
        setEditingId(product.id);
        setFormData({ ...product });
        setIsAdding(false);
    };

    const startAdd = () => {
        setIsAdding(true);
        setEditingId(null);
        if (activeTab === 'books') {
            setFormData({
                id: Date.now(),
                title: '',
                author: '',
                image: '',
                affiliateLinkIN: '',
                affiliateLinkUS: ''
            });
        } else {
            setFormData({
                id: Date.now(),
                title: '',
                description: '',
                image: '',
                price: '',
                affiliateLink: '',
                category: ''
            });
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({});
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveProduct = () => {
        if (activeTab === 'books') {
            if (!formData.title || !formData.author) {
                showToast('Please fill in title and author', 'error');
                return;
            }
            
            if (isAdding) {
                setProducts([...products, formData]);
                showToast('Book added successfully!', 'success');
            } else {
                setProducts(products.map(p => p.id === editingId ? formData : p));
                showToast('Book updated successfully!', 'success');
            }
        } else {
            if (!formData.title || !formData.price || !formData.affiliateLink) {
                showToast('Please fill in required fields', 'error');
                return;
            }
            
            if (isAdding) {
                setAffiliateProducts([...affiliateProducts, formData]);
                showToast('Product added successfully!', 'success');
            } else {
                setAffiliateProducts(affiliateProducts.map(p => p.id === editingId ? formData : p));
                showToast('Product updated successfully!', 'success');
            }
        }
        cancelEdit();
    };

    const deleteProduct = (id) => {
        if (activeTab === 'books') {
            if (window.confirm('Are you sure you want to delete this book?')) {
                setProducts(products.filter(p => p.id !== id));
                showToast('Book deleted successfully', 'success');
            }
        } else {
            if (window.confirm('Are you sure you want to delete this product?')) {
                setAffiliateProducts(affiliateProducts.filter(p => p.id !== id));
                showToast('Product deleted successfully', 'success');
            }
        }
    };

    const currentProducts = activeTab === 'books' ? products : affiliateProducts;
    const productType = activeTab === 'books' ? 'Book' : 'Product';

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="admin-header-left">
                    <Link to="/" className="admin-back-btn">
                        <ArrowLeft size={20} /> Back to Site
                    </Link>
                    <h1>Admin Dashboard</h1>
                    <span className="product-count">
                        {currentProducts.length} {activeTab === 'books' ? 'Books' : 'Products'}
                    </span>
                </div>
                <div className="admin-header-right">
                    <button onClick={startAdd} className="add-product-btn">
                        <Plus size={20} /> Add {productType}
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
                    onClick={() => setActiveTab('books')}
                >
                    <Book size={20} />
                    Books ({products.length})
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'affiliate' ? 'active' : ''}`}
                    onClick={() => setActiveTab('affiliate')}
                >
                    <ShoppingBag size={20} />
                    Affiliate Products ({affiliateProducts.length})
                </button>
            </div>

            {/* Edit/Add Form Modal Overlay */}
            {(editingId || isAdding) && (
                <div className="modal-overlay" onClick={cancelEdit}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{isAdding ? `Add New ${productType}` : `Edit ${productType}`}</h2>
                            <button onClick={cancelEdit} className="close-modal-btn">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Title *</label>
                                <input 
                                    name="title" 
                                    value={formData.title || ''} 
                                    onChange={handleChange} 
                                    placeholder={`Enter ${activeTab === 'books' ? 'book' : 'product'} title`} 
                                />
                            </div>
                            
                            {activeTab === 'books' ? (
                                <>
                                    <div className="form-group">
                                        <label>Author *</label>
                                        <input 
                                            name="author" 
                                            value={formData.author || ''} 
                                            onChange={handleChange} 
                                            placeholder="Enter author name" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Cover Image URL</label>
                                        <input 
                                            name="image" 
                                            value={formData.image || ''} 
                                            onChange={handleChange} 
                                            placeholder="https://example.com/image.jpg" 
                                        />
                                        {formData.image && (
                                            <div className="image-preview">
                                                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>India Affiliate Link</label>
                                        <input 
                                            name="affiliateLinkIN" 
                                            value={formData.affiliateLinkIN || ''} 
                                            onChange={handleChange} 
                                            placeholder="https://amzn.to/..." 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>USA Affiliate Link</label>
                                        <input 
                                            name="affiliateLinkUS" 
                                            value={formData.affiliateLinkUS || ''} 
                                            onChange={handleChange} 
                                            placeholder="https://amzn.to/..." 
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea 
                                            name="description" 
                                            value={formData.description || ''} 
                                            onChange={handleChange} 
                                            placeholder="Enter product description"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input 
                                            name="image" 
                                            value={formData.image || ''} 
                                            onChange={handleChange} 
                                            placeholder="https://example.com/image.jpg" 
                                        />
                                        {formData.image && (
                                            <div className="image-preview">
                                                <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Price *</label>
                                        <input 
                                            name="price" 
                                            value={formData.price || ''} 
                                            onChange={handleChange} 
                                            placeholder="$99.99" 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Affiliate Link *</label>
                                        <input 
                                            name="affiliateLink" 
                                            value={formData.affiliateLink || ''} 
                                            onChange={handleChange} 
                                            placeholder="https://amzn.to/..." 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input 
                                            name="category" 
                                            value={formData.category || ''} 
                                            onChange={handleChange} 
                                            placeholder="Electronics, Fitness, etc." 
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button onClick={cancelEdit} className="cancel-btn">
                                <X size={16} /> Cancel
                            </button>
                            <button onClick={saveProduct} className="save-btn">
                                <Save size={16} /> Save {productType}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product List Table */}
            <div className="admin-products-container">
                {currentProducts.length === 0 ? (
                    <div className="empty-state">
                        <Plus size={48} />
                        <h3>No {activeTab === 'books' ? 'Books' : 'Products'} Added Yet</h3>
                        <p>Start building your collection by adding your first {activeTab === 'books' ? 'book' : 'product'}.</p>
                        <button onClick={startAdd} className="add-product-btn">
                            <Plus size={20} /> Add First {productType}
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {currentProducts.map(product => (
                            <div key={product.id} className="admin-product-card">
                                <div className="admin-card-image">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="admin-card-content">
                                    <h3>{product.title}</h3>
                                    {activeTab === 'books' ? (
                                        <>
                                            <p className="author">{product.author}</p>
                                            <div className="affiliate-links">
                                                <a href={product.affiliateLinkIN} target="_blank" rel="noopener noreferrer">
                                                    India Link →
                                                </a>
                                                <a href={product.affiliateLinkUS} target="_blank" rel="noopener noreferrer">
                                                    USA Link →
                                                </a>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="description">{product.description}</p>
                                            <p className="price">{product.price}</p>
                                            {product.category && <span className="category-tag">{product.category}</span>}
                                            <div className="affiliate-links">
                                                <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                                                    View Product →
                                                </a>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="admin-card-actions">
                                    <button onClick={() => startEdit(product)} className="edit-btn">
                                        <Edit size={18} /> Edit
                                    </button>
                                    <button onClick={() => deleteProduct(product.id)} className="delete-btn">
                                        <Trash2 size={18} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;

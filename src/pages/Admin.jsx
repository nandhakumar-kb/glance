import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus, Save, X, ArrowLeft, Lock } from 'lucide-react';
import '../index.css';

function Admin({ products, setProducts }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center', width: '100%', maxWidth: '350px' }}>
                    <Lock size={48} color="var(--primary-gold)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ marginBottom: '1.5rem', color: '#fff' }}>Admin Login</h2>
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Enter Password"
                            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#000', color: '#fff' }}
                        />
                        <button type="submit" className="primary-button" style={{ justifyContent: 'center' }}>Login</button>
                    </form>
                    <div style={{ marginTop: '1rem' }}>
                        <Link to="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Home</Link>
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
        setFormData({
            id: Date.now(), // simple unique id
            title: '',
            author: '',
            image: '',
            affiliateLinkIN: '',
            affiliateLinkUS: ''
        });
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
        if (isAdding) {
            setProducts([...products, formData]);
        } else {
            setProducts(products.map(p => p.id === editingId ? formData : p));
        }
        cancelEdit();
    };

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="app-container" style={{ padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" className="back-link"><ArrowLeft size={24} color="var(--primary-gold)" /></Link>
                    <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
                </div>
                <button onClick={startAdd} className="cta-button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add New Book
                </button>
            </header>

            {/* Edit/Add Form Modal Overlay */}
            {(editingId || isAdding) && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{isAdding ? 'Add New Book' : 'Edit Book'}</h2>
                        <div className="form-group">
                            <label>Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} placeholder="Book Title" />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input name="author" value={formData.author} onChange={handleChange} placeholder="Author Name" />
                        </div>
                        <div className="form-group">
                            <label>Cover Image URL</label>
                            <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                        </div>
                        <div className="form-group">
                            <label>India Affiliate Link</label>
                            <input name="affiliateLinkIN" value={formData.affiliateLinkIN} onChange={handleChange} placeholder="https://amzn.to/..." />
                        </div>
                        <div className="form-group">
                            <label>USA Affiliate Link</label>
                            <input name="affiliateLinkUS" value={formData.affiliateLinkUS} onChange={handleChange} placeholder="https://amzn.to/..." />
                        </div>
                        <div className="modal-actions">
                            <button onClick={cancelEdit} className="secondary-button">Cancel</button>
                            <button onClick={saveProduct} className="primary-button"><Save size={16} /> Save Product</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product List Table */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Title / Author</th>
                            <th>Links</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.title} style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td>
                                    <strong>{product.title}</strong>
                                    <div style={{ color: '#888', fontSize: '0.9rem' }}>{product.author}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.8rem' }}>
                                        <a href={product.affiliateLinkIN} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-gold)' }}>IN Link</a>
                                        <a href={product.affiliateLinkUS} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-gold)' }}>US Link</a>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button onClick={() => startEdit(product)} className="icon-button"><Edit size={20} /></button>
                                        <button onClick={() => deleteProduct(product.id)} className="icon-button delete"><Trash2 size={20} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          width: 90%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group input {
          padding: 0.8rem;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: #000;
          color: #fff;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }
        .secondary-button {
          background: transparent;
          border: 1px solid var(--border-color);
          color: #ccc;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        .primary-button {
          background: var(--primary-gold);
          color: #000;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: bold;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          color: #fff;
        }
        .admin-table th {
          text-align: left;
          padding: 1rem;
          border-bottom: 2px solid var(--border-color);
          color: var(--primary-gold);
        }
        .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .icon-button {
          background: none;
          border: none;
          color: #ccc;
          cursor: pointer;
          transition: color 0.2s;
        }
        .icon-button:hover {
          color: var(--primary-gold);
        }
        .icon-button.delete:hover {
          color: #ff4444;
        }
        .back-link {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--card-bg);
            padding: 8px;
            border-radius: 50%;
            transition: transform 0.2s;
        }
        .back-link:hover {
            transform: scale(1.1);
        }
      `}</style>
        </div>
    );
}

export default Admin;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import './Contact.css';

const Contact = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <Link to="/" className="contact-back-btn">
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <div className="contact-content">
                    <div className="contact-header">
                        <h1>Get in Touch</h1>
                        <p>Have a question or suggestion? We'd love to hear from you!</p>
                    </div>

                    <div className="contact-grid">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>

                            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <Send size={18} /> Send Message
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="contact-info">
                            <div className="info-card">
                                <Mail size={32} />
                                <h3>Email Us</h3>
                                <p>contact@glanceread.com</p>
                            </div>

                            <div className="info-card">
                                <h3>Follow Us</h3>
                                <div className="social-links">
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                        <Twitter size={24} />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <Linkedin size={24} />
                                    </a>
                                </div>
                            </div>

                            <div className="info-card">
                                <h3>About GlanceRead</h3>
                                <p>
                                    Curating premium books that shape successful minds. 
                                    Handpicked for your personal growth and library.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

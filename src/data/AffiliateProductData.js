/**
 * Affiliate Products Data
 * Collection of affiliate products across various categories.
 * Products include description, pricing, and categorization.
 * @module AffiliateProductData
 */

/**
 * Default affiliate product collection
 * @type {Array<Object>}
 * @property {number} id - Unique product identifier
 * @property {string} title - Product title
 * @property {string} description - Product description
 * @property {string} image - Product image URL
 * @property {string} price - Product price (localized)
 * @property {string} affiliateLink - Affiliate purchase link
 * @property {string} category - Product category
 */
export const affiliateProducts = [
  {
    id: 1,
    title: "Nivea Men Dark Spot Reduction Cream",
    description: "Non-greasy daily moisturizer with UV protection, specifically formulated for men's skin",
    image: "https://m.media-amazon.com/images/I/51Jer-OTUtL._SX679_.jpg",
    price: "₹246",
    affiliateLink: "https://amzn.to/4phu9JZ",
    category: "Beauty & Personal Care"
  }
];

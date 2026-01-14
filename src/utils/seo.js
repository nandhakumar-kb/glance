/**
 * SEO Utilities
 * Helper functions for managing SEO meta tags and structured data dynamically
 */

/**
 * Update document title
 * @param {string} title - Page title
 */
export const updateTitle = (title) => {
    document.title = title;

    // Update OG title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
};

/**
 * Update meta description
 * @param {string} description - Page description
 */
export const updateDescription = (description) => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update OG description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update Twitter description
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);
};

/**
 * Update canonical URL
 * @param {string} url - Canonical URL
 */
export const updateCanonical = (url) => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Update OG URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);
};

/**
 * Update meta keywords
 * @param {string} keywords - Comma-separated keywords
 */
export const updateKeywords = (keywords) => {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
};

/**
 * Add structured data (JSON-LD)
 * @param {Object} data - Structured data object
 * @param {string} id - Unique ID for the script tag
 */
export const addStructuredData = (data, id = 'dynamic-structured-data') => {
    // Remove existing dynamic structured data
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    // Create new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
};

/**
 * Update all SEO metadata
 * @param {Object} seoData - SEO data object
 * @param {string} seoData.title - Page title
 * @param {string} seoData.description - Page description
 * @param {string} seoData.keywords - Page keywords
 * @param {string} seoData.canonical - Canonical URL
 * @param {Object} seoData.structuredData - Structured data object
 */
export const updateSEO = ({ title, description, keywords, canonical, structuredData }) => {
    if (title) updateTitle(title);
    if (description) updateDescription(description);
    if (keywords) updateKeywords(keywords);
    if (canonical) updateCanonical(canonical);
    if (structuredData) addStructuredData(structuredData);
};

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items [{name, url}]
 * @returns {Object} Breadcrumb structured data
 */
export const generateBreadcrumbs = (breadcrumbs) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': crumb.url
    }))
});

/**
 * Generate product structured data for books
 * @param {Object} book - Book object
 * @returns {Object} Product structured data
 */
export const generateBookStructuredData = (book) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': book.title,
    'description': book.description || `${book.title} by ${book.author}`,
    'image': book.image,
    'author': {
        '@type': 'Person',
        'name': book.author
    },
    'offers': {
        '@type': 'Offer',
        'url': book.link,
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'INR'
    },
    'aggregateRating': book.rating ? {
        '@type': 'AggregateRating',
        'ratingValue': book.rating,
        'reviewCount': book.reviews || 100
    } : undefined
});

/**
 * Generate collection page structured data
 * @param {Array} items - Array of items
 * @param {string} name - Collection name
 * @returns {Object} Collection structured data
 */
export const generateCollectionStructuredData = (items, name) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': name,
    'description': `Browse our curated collection of ${items.length} premium books`,
    'url': window.location.href,
    'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': items.length,
        'itemListElement': items.slice(0, 10).map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'Product',
                'name': item.title,
                'image': item.image,
                'offers': {
                    '@type': 'Offer',
                    'url': item.affiliateLinkIN || item.link || window.location.href,
                    'availability': 'https://schema.org/InStock',
                    'priceCurrency': 'INR'
                }
            }
        }))
    }
});

export default {
    updateTitle,
    updateDescription,
    updateCanonical,
    updateKeywords,
    addStructuredData,
    updateSEO,
    generateBreadcrumbs,
    generateBookStructuredData,
    generateCollectionStructuredData
};

/**
 * Application Constants
 * Centralized configuration for all magic numbers, timing values, and keys.
 * Improves maintainability and prevents hardcoded values throughout the codebase.
 * @module constants
 */

/**
 * Admin authentication password from environment variables
 * @type {string}
 * @default 'admin123'
 */
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

/**
 * Timing values in milliseconds
 * Controls delays, debouncing, and animation timing
 * @type {Object}
 * @property {number} TOAST_DURATION - Toast notification display time
 * @property {number} SEARCH_DEBOUNCE - Search input debounce delay
 * @property {number} LOADING_DELAY - Loading spinner display delay
 * @property {number} PRODUCTS_LOADING_DELAY - Products loading delay
 * @property {number} SUGGESTION_BLUR_DELAY - Search suggestions blur delay
 * @property {number} REDIRECT_COUNTDOWN - Redirect countdown duration
 * @property {number} COUNTDOWN_INTERVAL - Countdown timer interval
 */
export const TIMINGS = {
  TOAST_DURATION: 3000,
  SEARCH_DEBOUNCE: 300,
  LOADING_DELAY: 800,
  PRODUCTS_LOADING_DELAY: 600,
  SUGGESTION_BLUR_DELAY: 200,
  REDIRECT_COUNTDOWN: 10000,
  COUNTDOWN_INTERVAL: 1000,
};

/**
 * UI behavior thresholds
 * Defines trigger points for various UI interactions
 * @type {Object}
 * @property {number} SCROLL_TO_TOP_THRESHOLD - Pixels before showing scroll-to-top
 * @property {number} MIN_SEARCH_LENGTH - Minimum characters for search
 * @property {number} MAX_SUGGESTIONS - Maximum search suggestions shown
 */
export const UI_THRESHOLDS = {
  SCROLL_TO_TOP_THRESHOLD: 400,
  MIN_SEARCH_LENGTH: 2,
  MAX_SUGGESTIONS: 5,
};

/**
 * LocalStorage keys and versioning
 * Manages data persistence with version control
 * @type {Object}
 * @property {string} BOOKS - Books storage key
 * @property {string} AFFILIATE_PRODUCTS - Affiliate products storage key
 * @property {string} FAVORITES - Favorites storage key
 * @property {string} BOOKS_VERSION - Books data version
 * @property {string} AFFILIATE_VERSION - Affiliate products data version
 */
export const STORAGE_KEYS = {
  BOOKS: 'glanceread_books',
  AFFILIATE_PRODUCTS: 'glanceread_affiliate_products',
  FAVORITES: 'glanceread_favorites',
  BOOKS_VERSION: '1.2',
  AFFILIATE_VERSION: '2.1',
};

/**
 * Admin panel tab identifiers
 * @type {Object}
 * @property {string} BOOKS - Books management tab
 * @property {string} AFFILIATE - Affiliate products management tab
 */
export const ADMIN_TABS = {
  BOOKS: 'books',
  AFFILIATE: 'affiliate',
};

/**
 * Product sorting options
 * @type {Object}
 * @property {string} DEFAULT - Default sort order
 * @property {string} TITLE - Sort by title
 * @property {string} AUTHOR - Sort by author
 */
export const SORT_OPTIONS = {
  DEFAULT: 'default',
  TITLE: 'title',
  AUTHOR: 'author',
};

// Categories
export const CATEGORIES = {
  ALL: 'All',
};

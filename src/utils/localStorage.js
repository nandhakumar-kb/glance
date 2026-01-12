/**
 * LocalStorage Utilities
 * Centralized localStorage management with error handling and versioning
 */

/**
 * Get item from localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Parsed value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

/**
 * Set item in localStorage with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error writing ${key} to localStorage:`, error);
        return false;
    }
};

/**
 * Initialize versioned data in localStorage
 * @param {string} dataKey - Key for the data
 * @param {string} versionKey - Key for the version
 * @param {string} currentVersion - Current version number
 * @param {*} initialData - Initial data to use
 * @returns {*} Loaded or initialized data
 */
export const initVersionedStorage = (dataKey, versionKey, currentVersion, initialData) => {
    const savedVersion = localStorage.getItem(versionKey);
    const saved = localStorage.getItem(dataKey);

    // Reset if version mismatch or no data
    if (savedVersion !== currentVersion || !saved) {
        localStorage.setItem(versionKey, currentVersion);
        setStorageItem(dataKey, initialData);
        return initialData;
    }

    // Try to parse saved data
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
    } catch (error) {
        console.error(`Failed to parse ${dataKey}:`, error);
    }

    // Fallback to initial data
    setStorageItem(dataKey, initialData);
    return initialData;
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeStorageItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
    }
};

/**
 * Clear all localStorage
 */
export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

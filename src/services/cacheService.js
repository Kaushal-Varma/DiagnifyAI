const CACHE_PREFIX = 'diagnify_cache_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const getCachedData = (key) => {
    try {
        const item = localStorage.getItem(CACHE_PREFIX + key);
        if (!item) return null;

        const { value, timestamp } = JSON.parse(item);
        if (Date.now() - timestamp > CACHE_EXPIRY) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }

        return value;
    } catch (error) {
        console.error("Cache read error:", error);
        return null;
    }
};

export const setCachedData = (key, value) => {
    try {
        const item = {
            value,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
    } catch (error) {
        console.error("Cache write error:", error);
        // If quota exceeded, clear old cache items
        if (error.name === 'QuotaExceededError') {
            localStorage.clear();
        }
    }
};

// Simple hash function to create keys from long strings (like base64 images)
export const generateCacheKey = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
};

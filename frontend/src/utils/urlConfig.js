const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getImageUrl = (path) => {
    if (!path) return '';

    // If it's an external URL, wrap it with a free image proxy for optimization (WebP/compression)
    if (path.startsWith('http')) {
        // Using images.weserv.nl (Free, no-auth image proxy & CDN)
        // It converts to WebP and optimizes on the fly
        return `https://images.weserv.nl/?url=${encodeURIComponent(path)}&output=webp&q=80`;
    }

    // Ensure local paths start with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BACKEND_URL}${cleanPath}`;
};

export default BACKEND_URL;

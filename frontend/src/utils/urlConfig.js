const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${BACKEND_URL}${cleanPath}`;
};

export default BACKEND_URL;

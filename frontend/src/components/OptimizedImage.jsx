import { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className = '', imageClassName = '', ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Reset state if src changes
        setIsLoaded(false);
        setError(false);
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            {!isLoaded && !error && (
                <div className="absolute inset-0 skeleton w-full h-full rounded-md" />
            )}

            {error ? (
                <div className="flex items-center justify-center bg-gray-100 text-gray-400 text-[10px] w-full h-full rounded-md text-center p-2 min-h-[100px]">
                    Image not found
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    className={`${imageClassName} image-fade-in ${isLoaded ? 'image-loaded' : ''} ${!isLoaded ? 'invisible' : ''}`}
                    style={{ width: '100%', height: 'auto', ...props.style }}
                />
            )}
        </div>
    );
};

export default OptimizedImage;

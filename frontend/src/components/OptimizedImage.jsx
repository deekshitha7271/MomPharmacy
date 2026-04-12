import { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ src, alt, className = '', imageClassName = '', ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        setIsLoaded(false);
        setError(false);

        if (imgRef.current && imgRef.current.complete) {
            setIsLoaded(true);
        }
    }, [src]);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ ...props.style }}
        >
            {!isLoaded && !error && (
                <div className="absolute inset-0 skeleton w-full h-full rounded-md" />
            )}

            {error ? (
                <div className="flex items-center justify-center bg-gray-100 text-gray-400 text-xs w-full h-full min-h-[150px] rounded-md text-center p-4">
                    Image not found
                </div>
            ) : (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setError(true)}
                    className={`${imageClassName} image-fade-in ${isLoaded ? 'image-loaded' : ''}`}
                />
            )}
        </div>
    );
};

export default OptimizedImage;

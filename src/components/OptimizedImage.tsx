import React, { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  style,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div
        className={`image-error ${className || ""}`}
        style={{
          ...style,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        Ошибка загрузки
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div
          className={`image-skeleton ${className || ""}`}
          style={{
            ...style,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className || ""} ${isLoaded ? "loaded" : "loading"}`}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          position: isLoaded ? "relative" : "absolute",
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </>
  );
};

export default OptimizedImage;

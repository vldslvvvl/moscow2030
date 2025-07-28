import React from "react";
import OptimizedImage from "./OptimizedImage";

interface PropertyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const PropertyImage: React.FC<PropertyImageProps> = ({
  src,
  alt,
  className,
}) => {
  // Функция для получения правильного изображения по названию
  const getImageByType = (imageName: string): string => {
    const imageMap: { [key: string]: string } = {
      "спальня 1": "/src/assets/images/mock/спальня 1.jpg",
      "спальня 2": "/src/assets/images/mock/спальня 2.jpg",
      "спальня 3": "/src/assets/images/mock/спальня 3.jpg",
      "спальня 4": "/src/assets/images/mock/спальня 4.jpg",
      "кухня 1": "/src/assets/images/mock/кухня 1.jpg",
      "кухня 2": "/src/assets/images/mock/кухня 2.jpg",
      "кухня 3": "/src/assets/images/mock/кухня 3.jpg",
      "кухня 4": "/src/assets/images/mock/кухня 4.jpg",
      "ванная 1": "/src/assets/images/mock/ванная 1.jpg",
      "ванная 2": "/src/assets/images/mock/ванная 2.jpg",
      "ванная 3": "/src/assets/images/mock/ванная 3.jpg",
      "ванная 4": "/src/assets/images/mock/ванная 4.jpg",
      "гостиная 1": "/src/assets/images/mock/гостиная 1.jpg",
      "гостиная 2": "/src/assets/images/mock/гостиная 2.jpg",
      "гостиная 3": "/src/assets/images/mock/гостиная 3.jpg",
      "гостиная 4": "/src/assets/images/mock/гостиная 4.jpg",
    };

    return imageMap[imageName] || src;
  };

  const imageSrc = getImageByType(src);

  return <OptimizedImage src={imageSrc} alt={alt} className={className} />;
};

export default PropertyImage;

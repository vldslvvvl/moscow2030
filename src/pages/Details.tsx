import React, { useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import OptimizedImage from "../components/OptimizedImage";
import { usePageContext } from "../context/PageContext";
import "./Details.css";

import backgroundVideo from "../assets/images/background-bot-2.MOV";

const Details: React.FC = () => {
  const { navigateTo, propertyDetails, setAuctionData } = usePageContext();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Проверяем, есть ли данные о недвижимости
  if (!propertyDetails) {
    // Если данных нет, возвращаемся на страницу списка
    navigateTo("listing");
    return null;
  }

  const handleThumbnailClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleContractForm = useCallback(() => {
    console.log("Открытие бланка договора");
    // Здесь будет логика открытия бланка договора
  }, []);

  const handleGoToTrading = useCallback(() => {
    console.log("Переход на торговую площадку");

    // Извлекаем числовую цену из строки
    const priceMatch = propertyDetails.price.match(/[\d\s]+/);
    const price = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, "")) : 0;

    // Устанавливаем данные для аукциона
    setAuctionData({
      id: propertyDetails.id,
      title: propertyDetails.title,
      price: price,
      type: propertyDetails.type,
    });

    // Переходим на страницу регистрации
    navigateTo("registration");
  }, [navigateTo, propertyDetails, setAuctionData]);

  const handleBackClick = useCallback(() => {
    navigateTo("listing");
  }, [navigateTo]);

  // Мемоизируем рендер миниатюр
  const thumbnailElements = useMemo(
    () =>
      propertyDetails.thumbnails.map((thumbnail, index) => (
        <div
          key={index}
          className={`thumbnail ${
            selectedImageIndex === index ? "active" : ""
          }`}
          onClick={() => handleThumbnailClick(index)}
        >
          <OptimizedImage
            src={thumbnail}
            alt={`Фото ${index + 1}`}
            className="thumbnail-image"
          />
        </div>
      )),
    [propertyDetails.thumbnails, selectedImageIndex, handleThumbnailClick]
  );

  // Мемоизируем рендер преимуществ
  const advantagesElements = useMemo(
    () =>
      propertyDetails.advantages.map((advantage, index) => (
        <li key={index} className="advantage-item">
          {advantage}
        </li>
      )),
    [propertyDetails.advantages]
  );

  return (
    <div className="details-page">
      <Header showBackButton={true} onBackClick={handleBackClick} />
      <main className="details-content">
        <div className="details-container">
          {/* Основная карточка */}
          <div className="property-card">
            {/* Основное изображение */}
            <div className="main-image-container">
              <img
                src={propertyDetails.thumbnails[selectedImageIndex]}
                alt={propertyDetails.title}
                className="main-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Информационная панель */}
            <div className="info-panel">
              {/* Миниатюры */}
              <div className="thumbnails-container">{thumbnailElements}</div>

              {/* Заголовок */}
              <h1 className="property-title">{propertyDetails.title}</h1>

              {/* Преимущества */}
              <div className="advantages-section">
                <h3 className="advantages-title">
                  Преимущества покупки недвижимости у города:
                </h3>
                <ul className="advantages-list">{advantagesElements}</ul>
              </div>

              {/* Кнопка бланка договора */}
              <button
                className="contract-form-button"
                onClick={handleContractForm}
              >
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_58_4150)">
                    <path
                      d="M14.667 4.62695H16.5003C16.9866 4.62695 17.4529 4.82011 17.7967 5.16392C18.1405 5.50774 18.3337 5.97406 18.3337 6.46029V19.2936C18.3337 19.7799 18.1405 20.2462 17.7967 20.59C17.4529 20.9338 16.9866 21.127 16.5003 21.127H5.50033C5.0141 21.127 4.54778 20.9338 4.20396 20.59C3.86015 20.2462 3.66699 19.7799 3.66699 19.2936V6.46029C3.66699 5.97406 3.86015 5.50774 4.20396 5.16392C4.54778 4.82011 5.0141 4.62695 5.50033 4.62695H7.33366"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.7497 2.79102H8.24967C7.74341 2.79102 7.33301 3.20142 7.33301 3.70768V5.54102C7.33301 6.04728 7.74341 6.45768 8.24967 6.45768H13.7497C14.2559 6.45768 14.6663 6.04728 14.6663 5.54102V3.70768C14.6663 3.20142 14.2559 2.79102 13.7497 2.79102Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_58_4150">
                      <rect
                        width="22"
                        height="22"
                        fill="white"
                        transform="translate(0 0.958984)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Бланк договора
              </button>

              {/* Цена и кнопка покупки */}
              <div className="price-action-row">
                <div className="price-container">
                  <span className="price">{propertyDetails.price}</span>
                </div>
                <button className="trading-button" onClick={handleGoToTrading}>
                  ПЕРЕЙТИ НА ТОРГОВУЮ ПЛОЩАДКУ →
                  <svg
                    className="arrow-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 1L15 8L8 15M15 8H1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="background-shape"></div>
      <div className="background-shape-2"></div>
      <div className="background-shape-3"></div>
      <div className="background-image">
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: 1329.14990234375,
            height: 898,
            top: 1207,
            opacity: 0.15,
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Details;

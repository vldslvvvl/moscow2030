import React, { useState } from "react";
import Header from "../components/Header";
import { usePageContext, PropertyDetails } from "../context/PageContext";
import homeLayoutIcon from "../assets/icons/home-layout.svg";
import carGarageIcon from "../assets/icons/car-garage.svg";
import teaCoffeeIcon from "../assets/icons/tea-coffee.svg";
import "./Listing.css";
import backgroundVideo from "../assets/images/background-bot-2.MOV";

interface PropertyItem {
  id: number;
  type: "apartment" | "parking" | "commercial";
  title: string;
  price: string;
  image: string;
  area?: string;
  rooms?: number;
  mainImage: string;
  thumbnails: string[];
  advantages: string[];
}

interface TabData {
  id: string;
  label: string;
  icon: string;
  type: "apartment" | "parking" | "commercial";
}

const Listing: React.FC = () => {
  const { navigateTo, setAuctionData, setPropertyDetails } = usePageContext();
  const [activeTab, setActiveTab] = useState<
    "apartment" | "parking" | "commercial"
  >("apartment");
  const [isChanging, setIsChanging] = useState(false);

  const tabs: TabData[] = [
    {
      id: "apartment",
      label: "Квартира",
      icon: homeLayoutIcon,
      type: "apartment",
    },
    {
      id: "parking",
      label: "Машино-место",
      icon: carGarageIcon,
      type: "parking",
    },
    {
      id: "commercial",
      label: "Помещение для бизнеса",
      icon: teaCoffeeIcon,
      type: "commercial",
    },
  ];

  const apartmentData: PropertyItem[] = [
    {
      id: 1,
      type: "apartment",
      title: "2-комн. квартира на продажу, 68,3 м²",
      price: "26 418 440 ₽",
      image: "/src/assets/images/mock/1/Гостиная.png",
      area: "68,3м²",
      rooms: 1,
      mainImage: "/src/assets/images/mock/1/Гостиная.png",
      thumbnails: [
        "/src/assets/images/mock/1/Гостиная.png",
        "/src/assets/images/mock/1/комната.png",
        "/src/assets/images/mock/1/кухня.png",
        "/src/assets/images/mock/1/ванная и туалет.png",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 2,
      type: "apartment",
      title: "1-комн. квартира на продажу, 41,4 м²",
      price: "16 663 500 ₽",
      image: "/src/assets/images/mock/2/комната.png",
      area: "45м²",
      rooms: 2,
      mainImage: "/src/assets/images/mock/2/комната.png",
      thumbnails: [
        "/src/assets/images/mock/2/Гостиная.png",
        "/src/assets/images/mock/2/комната.png",
        "/src/assets/images/mock/2/кухня.png",
        "/src/assets/images/mock/2/ванная.png",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 3,
      type: "apartment",
      title: "1-комн. квартира на продажу, 45 м²",
      price: "9 243 000 ₽",
      image: "/src/assets/images/mock/3/прихожая.png",
      area: "45м²",
      rooms: 1,
      mainImage: "/src/assets/images/mock/3/прихожая.png",
      thumbnails: [
        "/src/assets/images/mock/3/прихожая.png",
        "/src/assets/images/mock/3/комната.png",
        "/src/assets/images/mock/3/кухня.png",
        "/src/assets/images/mock/3/туалет.png",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 4,
      type: "apartment",
      title: "3-комн. квартира на продажу, 74,4 м²",
      price: "14 574 960 ₽",
      image: "/src/assets/images/mock/4/Комната.png",
      area: "92м²",
      rooms: 4,
      mainImage: "/src/assets/images/mock/4/Комната.png",
      thumbnails: [
        "/src/assets/images/mock/4/прихожая.png",
        "/src/assets/images/mock/4/комната.png",
        "/src/assets/images/mock/4/кухня.png",
        "/src/assets/images/mock/4/ванная.png",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
  ];

  const parkingData: PropertyItem[] = [
    {
      id: 1,
      type: "parking",
      title: "Москва, ЦАО, р-н Пресненский, Краснопресненская наб., 14Ак1",
      price: "3 200 000 ₽",
      image: "carplace1.PNG",
      mainImage: "/src/assets/images/mock/carplace1.PNG",
      thumbnails: [
        "/src/assets/images/mock/carplace1.PNG",
        "/src/assets/images/mock/carplace2.PNG",
        "/src/assets/images/mock/carplace3.PNG",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 2,
      type: "parking",
      title: "Москва, ЗАО, р-н Очаково-Матвеевское, Очаковское ш., 5к4",
      price: "1 800 000 ₽",
      image: "carplace2.PNG",
      mainImage: "/src/assets/images/mock/carplace2.PNG",
      thumbnails: [
        "/src/assets/images/mock/carplace2.PNG",
        "/src/assets/images/mock/carplace1.PNG",
        "/src/assets/images/mock/carplace4.PNG",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 3,
      type: "parking",
      title: "Москва, ЦАО, р-н Тверской, 2-я Брестская ул., 8",
      price: "2 500 000 ₽",
      image: "carplace3.PNG",
      mainImage: "/src/assets/images/mock/carplace3.PNG",
      thumbnails: [
        "/src/assets/images/mock/carplace3.PNG",
        "/src/assets/images/mock/carplace1.PNG",
        "/src/assets/images/mock/carplace2.PNG",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 4,
      type: "parking",
      title: "Москва, САО, р-н Хорошевский, Хорошевское ш., 25Ак2",
      price: "2 900 000 ₽",
      image: "carplace4.PNG",
      mainImage: "/src/assets/images/mock/carplace4.PNG",
      thumbnails: [
        "/src/assets/images/mock/carplace4.PNG",
        "/src/assets/images/mock/carplace1.PNG",
        "/src/assets/images/mock/carplace3.PNG",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
  ];

  const commercialData: PropertyItem[] = [
    {
      id: 1,
      type: "commercial",
      title: "Коммерческое помещение, 120м²",
      price: "45 000 000 ₽",
      image: "кухня 3.jpg",
      area: "120м²",
      mainImage: "/src/assets/images/mock/кухня 3.jpg",
      thumbnails: [
        "/src/assets/images/mock/кухня 3.jpg",
        "/src/assets/images/mock/спальня 1.jpg",
        "/src/assets/images/mock/ванная 1.jpg",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 2,
      type: "commercial",
      title: "Офисное помещение, 85м²",
      price: "28 000 000 ₽",
      image: "кухня 4.jpg",
      area: "85м²",
      mainImage: "/src/assets/images/mock/кухня 4.jpg",
      thumbnails: [
        "/src/assets/images/mock/кухня 4.jpg",
        "/src/assets/images/mock/спальня 2.jpg",
        "/src/assets/images/mock/ванная 2.jpg",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 3,
      type: "commercial",
      title: "Торговое помещение, 200м²",
      price: "65 000 000 ₽",
      image: "спальня 1.jpg",
      area: "200м²",
      mainImage: "/src/assets/images/mock/спальня 1.jpg",
      thumbnails: [
        "/src/assets/images/mock/спальня 1.jpg",
        "/src/assets/images/mock/кухня 1.jpg",
        "/src/assets/images/mock/ванная 1.jpg",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
    {
      id: 4,
      type: "commercial",
      title: "Складское помещение, 350м²",
      price: "95 000 000 ₽",
      image: "спальня 2.jpg",
      area: "350м²",
      mainImage: "/src/assets/images/mock/спальня 2.jpg",
      thumbnails: [
        "/src/assets/images/mock/спальня 2.jpg",
        "/src/assets/images/mock/кухня 2.jpg",
        "/src/assets/images/mock/ванная 2.jpg",
      ],
      advantages: [
        "прозрачные условия сделки",
        "заключение договора напрямую с городом без посредников",
        "проверенная документация на объекты",
        "стартовая цена ниже рыночной",
        "процедура покупки проходит полностью онлайн",
      ],
    },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case "apartment":
        return apartmentData;
      case "parking":
        return parkingData;
      case "commercial":
        return commercialData;
      default:
        return apartmentData;
    }
  };

  const handleTabClick = (type: "apartment" | "parking" | "commercial") => {
    if (activeTab === type) return;

    setIsChanging(true);

    setTimeout(() => {
      setActiveTab(type);
      setTimeout(() => {
        setIsChanging(false);
      }, 50);
    }, 300);
  };

  const handleBuyClick = (item: PropertyItem) => {
    console.log("Покупка:", item);

    // Извлекаем числовую цену из строки
    const priceMatch = item.price.match(/[\d\s]+/);
    const price = priceMatch ? parseInt(priceMatch[0].replace(/\s/g, "")) : 0;

    // Устанавливаем данные для аукциона
    setAuctionData({
      id: item.id,
      title: item.title,
      price: price,
      type: item.type,
    });

    // Переходим на страницу регистрации
    navigateTo("registration");
  };

  const handleDetailsClick = (item: PropertyItem) => {
    console.log("Детали:", item);

    const propertyDetails: PropertyDetails = {
      id: item.id,
      type: item.type,
      title: item.title,
      price: item.price,
      area: item.area,
      rooms: item.rooms,
      mainImage: item.mainImage,
      thumbnails: item.thumbnails,
      advantages: item.advantages,
    };

    setPropertyDetails(propertyDetails);

    navigateTo("details");
  };

  return (
    <div className="listing-page">
      <Header showBackButton={false} />
      <main className="listing-content">
        <div className="listing-container">
          <nav className="listing-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${
                  activeTab === tab.type ? "active" : ""
                }`}
                onClick={() => handleTabClick(tab.type)}
              >
                <div className="tab-icon-wrapper">
                  <img src={tab.icon} alt={tab.label} className="tab-icon" />
                </div>
                <span className="tab-label" data-text={tab.label}>
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>

          <div className={`property-grid ${isChanging ? "changing" : ""}`}>
            {getCurrentData().map((item) => (
              <div key={item.id} className="property-card">
                <div className="property-image">
                  <img
                    src={`${item.image}`}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="property-info">
                  <h3 className="property-title">{item.title}</h3>
                  <p className="property-price">{item.price}</p>
                  <div className="property-actions">
                    <button
                      className="buy-button"
                      onClick={() => handleBuyClick(item)}
                    >
                      Купить
                    </button>
                    <button
                      className="details-button"
                      onClick={() => handleDetailsClick(item)}
                    >
                      Детали
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default Listing;

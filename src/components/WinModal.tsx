import React from "react";
import { usePageContext } from "../context/PageContext";
import "./WinModal.css";
import trophyImage from "../assets/images/win.png";

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  winningBid: number;
}

const WinModal: React.FC<WinModalProps> = ({
  isOpen,
  onClose,
  propertyTitle,
  winningBid,
}) => {
  const { navigateTo } = usePageContext();

  const handleGoToPortal = () => {
    navigateTo("docs");
  };

  if (!isOpen) return null;

  return (
    <div className="win-modal-overlay">
      <div className="win-modal">
        {/* Конфетти */}
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, index) => {
            const animationType = index % 3;
            const animationName =
              animationType === 0
                ? "confettiFall"
                : animationType === 1
                ? "confettiFall2"
                : "confettiFall3";

            return (
              <div
                key={index}
                className={`confetti confetti-${index % 6}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2.5}s`,
                  animationName: animationName,
                  animationTimingFunction: `${
                    Math.random() > 0.5 ? "ease-in-out" : "linear"
                  }`,
                }}
              />
            );
          })}
        </div>

        {/* Заголовок */}
        <div className="win-title">
          <h1 className="win-title-main">ПОЗДРАВЛЯЕМ</h1>
          <h2 className="win-title-sub">С ПОБЕДОЙ!</h2>
        </div>

        {/* Детали */}
        <div className="win-details">
          <p className="win-property">{propertyTitle}</p>
          <p className="win-bid">
            Итоговая сумма: {winningBid.toLocaleString("ru-RU")} ₽
          </p>
        </div>

        {/* Трофей */}
        <div className="trophy-container">
          <img src={trophyImage} alt="Трофей" className="trophy-image" />
        </div>

        {/* Инструкция */}
        <div className="win-instruction">
          <p>Вернуться на Инвестпортал</p>
          <p>для оформления договора</p>
        </div>

        {/* Кнопка */}
        <button className="win-button" onClick={handleGoToPortal}>
          <span>ПЕРЕЙТИ</span>
          <svg
            width="27"
            height="26"
            viewBox="0 0 27 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.91602 13H21.0827"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5 5.41602L21.0833 12.9993L13.5 20.5827"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WinModal;

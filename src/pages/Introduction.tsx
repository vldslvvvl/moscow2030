import React, { useCallback } from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import { useButtonSound } from "../hooks/useButtonSound";
import "./Introduction.css";
import backgroundVideo from "../assets/images/background-bot-2.MOV";

interface InstructionCard {
  id: number;
  number: string;
  title: string;
  description: string;
}

const Introduction: React.FC = () => {
  const { navigateTo } = usePageContext();
  const playButtonSound = useButtonSound();

  const instructionCards: InstructionCard[] = [
    {
      id: 1,
      number: "01.",
      title: "ВЫБЕРИТЕ\nЛОТ",
      description: "Квартиру, машино-место или коммерческое помещение",
    },
    {
      id: 2,
      number: "02.",
      title: "ОЗНАКОМЬТЕСЬ С ПРЕДЛОЖЕНИЯМИ",
      description:
        "Просмотрите фото и ключевые документы, листайте и оценивайте",
    },
    {
      id: 3,
      number: "03.",
      title: "РЕГИСТРИРУЙТЕСЬ НА ТОРГАХ",
      description: "Получите ЭЦП, введите имя и начните аукцион",
    },
    {
      id: 4,
      number: "04.",
      title: "УЧАСТВУЙТЕ В АУКЦИОНЕ",
      description: "Повышайте ставки — побеждайте конкурентов",
    },
    {
      id: 5,
      number: "05.",
      title: "ПОБЕЖДАЙТЕ ИЛИ НАЧИНАЙТЕ СНАЧАЛА!",
      description: "",
    },
  ];

  const handleNextClick = () => {
    playButtonSound();
    navigateTo("listing");
  };

  const handleBackClick = useCallback(() => {
    navigateTo("start");
  }, [navigateTo]);

  return (
    <div className="introduction-page">
      <Header showBackButton={true} onBackClick={handleBackClick} />
      <main className="introduction-content">
        <div className="introduction-container">
          <p className="introduction-title">ИНСТРУКЦИЯ ПЕРЕД НАЧАЛОМ</p>

          <div className="instruction-cards">
            {instructionCards.map((card) => (
              <div key={card.id} className={`instruction-card card-${card.id}`}>
                <div className="card-number">{card.number}</div>
                <h3
                  className="card-title gradient-text"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {card.title}
                </h3>
                {card.description && (
                  <p className="card-description">{card.description}</p>
                )}
              </div>
            ))}
          </div>

          <button
            className="primary-button next-button"
            onClick={handleNextClick}
          >
            <span>ДАЛЕЕ</span>
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

export default Introduction;

import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import WinModal from "../components/WinModal";
import LoseModal from "../components/LoseModal";
import "./Auction.css";

interface Participant {
  id: string;
  name: string;
  bid: number;
  isUser: boolean;
}

const Auction: React.FC = () => {
  const { navigateTo, auctionData } = usePageContext();
  const [timeLeft, setTimeLeft] = useState(30);
  const [userBudget, setUserBudget] = useState(25000000);
  const [currentBid, setCurrentBid] = useState(15000000);
  const [isBlinking, setIsBlinking] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: "user", name: "Вы", bid: 15000000, isUser: true },
    { id: "alexey", name: "Алексей", bid: 14000000, isUser: false },
    { id: "oleg", name: "Олег", bid: 15000000, isUser: false },
  ]);

  // Таймер
  useEffect(() => {
    if (timeLeft <= 0) {
      // Аукцион завершен - определяем победителя
      const userBid = participants.find((p) => p.isUser)?.bid || 0;
      const maxOtherBid = Math.max(
        ...participants.filter((p) => !p.isUser).map((p) => p.bid)
      );

      if (userBid > maxOtherBid) {
        setShowWinModal(true);
      } else {
        setShowLoseModal(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;

        // Моргание в последние 5 секунд
        if (newTime <= 5 && newTime > 0) {
          setIsBlinking(true);
        } else {
          setIsBlinking(false);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]); // Убрали participants из зависимостей

  const handleIncreaseBid = useCallback(() => {
    if (isButtonDisabled) return;

    const increaseAmount = 1000000;
    if (userBudget >= increaseAmount) {
      setIsButtonDisabled(true);

      setUserBudget((prev) => prev - increaseAmount);
      setCurrentBid((prev) => prev + increaseAmount);

      // Обновляем ставку пользователя
      setParticipants((prev) =>
        prev.map((p) => (p.isUser ? { ...p, bid: p.bid + increaseAmount } : p))
      );

      // Разрешаем повторный клик через 300мс
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 300);
    }
  }, [userBudget, isButtonDisabled]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("ru-RU");
  };

  // Находим максимальную ставку для нормализации высоты баров
  const maxBid = Math.max(...participants.map((p) => p.bid));

  return (
    <div className="auction-page">
      <Header />
      <main className="auction-content">
        <div className="auction-container">
          {/* Таймер */}
          <div className={`auction-timer ${isBlinking ? "blinking" : ""}`}>
            {formatTime(timeLeft)}
          </div>

          {/* Информация о лоте */}
          <div className="lot-info">
            <h1 className="lot-title">{auctionData?.title || "Загрузка..."}</h1>
            <div className="lot-price">
              {auctionData
                ? `${auctionData.price.toLocaleString("ru-RU")} ₽`
                : "Загрузка..."}
            </div>
          </div>

          {/* Бюджет и текущая ставка */}
          <div className="bid-info">
            <div className="budget-box">
              <label className="info-label">Остаток бюджета, ₽</label>
              <div className="info-value">{formatCurrency(userBudget)}</div>
            </div>
            <div className="current-bid-box">
              <label className="info-label">Текущая ставка, ₽</label>
              <div className="info-value">{formatCurrency(currentBid)}</div>
            </div>
          </div>

          {/* Кнопка увеличения ставки */}
          <button
            className={`increase-bid-button ${
              isButtonDisabled ? "disabled" : ""
            }`}
            onClick={handleIncreaseBid}
            disabled={isButtonDisabled}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Увеличить ставку на 1 000 000 ₽</span>
          </button>

          {/* Визуализация участников */}
          <div className="participants-visualization">
            {participants.map((participant) => (
              <div key={participant.id} className="participant-bar">
                <div className="bar-value">
                  {formatCurrency(participant.bid)} ₽
                </div>
                <div className="bar-container">
                  <div
                    className={`bar ${
                      participant.isUser ? "user-bar" : "other-bar"
                    }`}
                    style={{
                      height: `${(participant.bid / maxBid) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className={`participant-name ${
                    participant.isUser ? "user-name" : "other-name"
                  }`}
                >
                  {participant.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="background-shape"></div>
      <div className="background-shape-2"></div>
      <div className="background-shape-3"></div>

      {/* Модальные окна */}
      <WinModal
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        propertyTitle={auctionData?.title || ""}
        winningBid={participants.find((p) => p.isUser)?.bid || 0}
      />

      <LoseModal
        isOpen={showLoseModal}
        onClose={() => setShowLoseModal(false)}
        userBudget={userBudget}
      />
    </div>
  );
};

export default Auction;

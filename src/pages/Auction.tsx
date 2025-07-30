import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import WinModal from "../components/WinModal";
import LoseModal from "../components/LoseModal";
import IsometricBars from "../components/IsometricBars";
import "./Auction.css";

interface Participant {
  id: string;
  name: string;
  bid: number;
  isUser: boolean;
}

const Auction: React.FC = () => {
  const { auctionData } = usePageContext();
  const [timeLeft, setTimeLeft] = useState(30);

  // Функция для расчета изначального бюджета (цена объекта + 30%)
  const calculateInitialBudget = (): number => {
    if (!auctionData?.price) {
      return 25000000; // Значение по умолчанию
    }
    return Math.round(auctionData.price * 1.3);
  };

  // Функция для получения начальной ставки (цена объекта)
  const getInitialBid = (): number => {
    return auctionData?.price || 15000000; // Значение по умолчанию
  };

  const initialBudget = calculateInitialBudget();
  const initialBid = getInitialBid();

  const [isBlinking, setIsBlinking] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: "user", name: "Вы", bid: initialBid, isUser: true },
    { id: "alexey", name: "Алексей", bid: initialBid, isUser: false },
    { id: "oleg", name: "Олег", bid: initialBid, isUser: false },
  ]);

  // Функция для расчета остатка бюджета пользователя
  const getUserBudgetRemaining = (): number => {
    const userParticipant = participants.find((p) => p.isUser);
    if (!userParticipant) return initialBudget;
    return initialBudget - userParticipant.bid;
  };

  // Функция для получения текущей ставки пользователя
  const getCurrentBid = (): number => {
    const userParticipant = participants.find((p) => p.isUser);
    return userParticipant?.bid || initialBid;
  };

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

      // Асинхронное увеличение ставок других участников
      setParticipants((prevParticipants) => {
        const bidIncrement = auctionData?.type === "parking" ? 50000 : 100000;
        return prevParticipants.map((participant) => {
          if (!participant.isUser) {
            return { ...participant, bid: participant.bid + bidIncrement };
          }
          return participant;
        });
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, auctionData?.type]);

  const handleIncreaseBid = useCallback(() => {
    // Динамическое определение суммы увеличения ставки в зависимости от типа объекта
    const increaseAmount = auctionData?.type === "parking" ? 50000 : 100000;

    setParticipants((prev) => {
      const currentUserBid = prev.find((p) => p.isUser)?.bid || 0;
      const remainingBudget = initialBudget - currentUserBid;

      if (remainingBudget >= increaseAmount) {
        return prev.map((p) =>
          p.isUser ? { ...p, bid: p.bid + increaseAmount } : p
        );
      }

      return prev; // Не изменяем состояние если недостаточно бюджета
    });
  }, [initialBudget, auctionData?.type]);

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
              <div className="info-value">
                {formatCurrency(getUserBudgetRemaining())}
              </div>
            </div>
            <div className="current-bid-box">
              <label className="info-label">Текущая ставка, ₽</label>
              <div className="info-value">
                {formatCurrency(getCurrentBid())}
              </div>
            </div>
          </div>

          {/* Кнопка увеличения ставки */}
          <button className={`increase-bid-button`} onClick={handleIncreaseBid}>
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
            <span>
              Увеличить ставку на{" "}
              {auctionData?.type === "parking" ? "50 000" : "100 000"}₽
            </span>
          </button>

          {/* Изометрическая визуализация участников */}
          <div className="participants-3d-container">
            <IsometricBars participants={participants} maxBid={maxBid} />
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
        userBudget={getUserBudgetRemaining()}
      />
    </div>
  );
};

export default Auction;

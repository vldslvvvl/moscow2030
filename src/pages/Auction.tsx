import React, { useState, useEffect, useCallback, useRef } from "react";
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
  isEliminated: boolean;
}

const Auction: React.FC = () => {
  const { auctionData } = usePageContext();

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

  // Простое состояние игры
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // 0 = игрок, 1 = Алексей, 2 = Олег
  const [gamePhase, setGamePhase] = useState<
    "playing" | "waiting_for_bot" | "finished"
  >("playing");
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);

  // Ref для предотвращения повторных срабатываний
  const botTurnInProgress = useRef(false);

  // Случайный выбор бота для первого выбывания
  const [firstBotToEliminate] = useState<string>(() => {
    const randomValue = Math.random();
    const chosen = randomValue < 0.5 ? "alexey" : "oleg";
    console.log(
      `🎲 Рандомное значение: ${randomValue.toFixed(3)}, выбран: ${chosen}`
    );
    return chosen;
  });

  // Определяем второго бота и отслеживаем раунд выбывания первого
  const secondBotToEliminate =
    firstBotToEliminate === "alexey" ? "oleg" : "alexey";
  const [firstBotEliminatedRound, setFirstBotEliminatedRound] = useState<
    number | null
  >(null);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "user",
      name: "Вы",
      bid: initialBid,
      isUser: true,
      isEliminated: false,
    },
    {
      id: "alexey",
      name: "Алексей",
      bid: initialBid,
      isUser: false,
      isEliminated: false,
    },
    {
      id: "oleg",
      name: "Олег",
      bid: initialBid,
      isUser: false,
      isEliminated: false,
    },
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

  // Порядок игроков: 0 = игрок, 1 = Алексей, 2 = Олег
  const playerOrder = [
    { id: "user", name: "Вы", isUser: true },
    { id: "alexey", name: "Алексей", isUser: false },
    { id: "oleg", name: "Олег", isUser: false },
  ];

  // Функция для определения шанса выбывания
  const getEliminationChance = (botId: string, round: number): number => {
    // Логика для первого бота (выбранного случайно)
    if (botId === firstBotToEliminate) {
      switch (round) {
        case 3:
          return 10;
        case 4:
          return 25;
        case 5:
          return 50;
        case 6:
          return 85;
        case 7:
          return 100;
        default:
          return 0; // В раундах 1-2 и после 7 - нет шанса
      }
    }

    // Логика для второго бота (может выбывать только через 2 раунда после первого)
    if (botId === secondBotToEliminate) {
      // Если первый бот еще не выбыл, второй не может выбыть
      if (firstBotEliminatedRound === null) return 0;

      // Второй бот может начать выбывать только через 2 раунда после первого
      const minimumRoundForSecond = firstBotEliminatedRound + 2;
      if (round < minimumRoundForSecond) return 0;

      // Прогрессивные шансы для второго бота после минимального раунда
      const roundsAfterMinimum = round - minimumRoundForSecond;
      switch (roundsAfterMinimum) {
        case 0:
          return 20; // Первый доступный раунд (через 2 раунда после первого)
        case 1:
          return 40; // +1 раунд
        case 2:
          return 60; // +2 раунда
        case 3:
          return 80; // +3 раунда
        case 4:
          return 90; // +4 раунда
        case 5:
          return 95; // +5 раундов
        default:
          // Для раундов 6+ или если игра идет дольше 10 раундов
          return round >= 10 ? 100 : 98; // 100% только в последнем раунде
      }
    }

    return 0; // Для пользователя или неизвестных ботов
  };

  // Получаем информацию о текущем игроке
  const getCurrentPlayer = () => {
    return playerOrder[currentPlayerIndex];
  };

  // Переход к следующему ходу (простая логика)
  const nextTurn = () => {
    const nextIndex = currentPlayerIndex + 1;

    // Если дошли до конца списка игроков - новый раунд
    if (nextIndex > 2) {
      setCurrentRound((prev) => prev + 1);
      setCurrentPlayerIndex(0);
      console.log(`🆕 Новый раунд ${currentRound + 1}/10`);
    } else {
      // Просто переходим к следующему игроку (не пропускаем никого)
      setCurrentPlayerIndex(nextIndex);
    }
  };

  // Ход бота
  const makeBotMove = (botId: string, botName: string) => {
    if (botTurnInProgress.current) return;

    console.log(`🤖 Начинаем ход бота: ${botName}`);
    botTurnInProgress.current = true;
    setGamePhase("waiting_for_bot");

    const delay = 1500 + Math.random() * 1000; // 1.5-2.5 секунды

    setTimeout(() => {
      // Проверяем, выбыл ли уже бот ранее
      const currentParticipant = participants.find((p) => p.id === botId);
      if (currentParticipant?.isEliminated) {
        console.log(`💀 ${botName} уже выбыл - ставка остается без изменений`);
        console.log(`🎯 Бот ${botName} завершил ход (выбывший)`);
        botTurnInProgress.current = false;
        setGamePhase("playing");
        nextTurn();
        return;
      }

      // Проверяем выбывание в начале хода
      const eliminationChance = getEliminationChance(botId, currentRound);
      let botWillBeEliminated = false;

      if (eliminationChance > 0) {
        console.log(
          `🎲 Шанс выбывания для ${botName} в раунде ${currentRound}: ${eliminationChance}%`
        );

        const roll = Math.random() * 100;
        console.log(
          `🎯 Бросок кубика для ${botName}: ${roll.toFixed(
            1
          )} (нужно < ${eliminationChance})`
        );

        if (roll < eliminationChance) {
          console.log(`❌ ${botName} выбывает из игры!`);
          botWillBeEliminated = true;

          // Отслеживаем выбывание первого бота
          if (
            botId === firstBotToEliminate &&
            firstBotEliminatedRound === null
          ) {
            setFirstBotEliminatedRound(currentRound);
            console.log(
              `📝 Первый бот (${botName}) выбыл в раунде ${currentRound}`
            );
          }
        } else {
          console.log(`✅ ${botName} остается в игре`);
        }
      }

      // Определяем размер ставки
      const bidIncrement = botWillBeEliminated
        ? 0
        : auctionData?.type === "parking"
        ? 50000
        : 100000;

      if (botWillBeEliminated) {
        console.log(`💀 ${botName} выбывает - ставка не увеличивается`);
      } else {
        console.log(`💰 Бот ${botName} делает ставку!`);
      }

      // Обновляем состояние участника
      setParticipants((prev) => {
        return prev.map((participant) => {
          if (participant.id === botId) {
            const newBid = participant.bid + bidIncrement;

            if (botWillBeEliminated) {
              console.log(
                `✅ ${botName}: ставка ${participant.bid.toLocaleString(
                  "ru-RU"
                )} ₽ (выбыл)`
              );
              return { ...participant, isEliminated: true };
            } else {
              console.log(
                `✅ ${botName} увеличил ставку: ${participant.bid.toLocaleString(
                  "ru-RU"
                )} → ${newBid.toLocaleString("ru-RU")} ₽`
              );
              return { ...participant, bid: newBid };
            }
          }
          return participant;
        });
      });

      // Проверяем окончание игры
      if (botWillBeEliminated) {
        const remainingBots = participants.filter(
          (p) => !p.isUser && !p.isEliminated && p.id !== botId
        );
        if (remainingBots.length === 0) {
          console.log("🎉 Все боты выбыли! Игрок победил!");
          botTurnInProgress.current = false;
          setGamePhase("finished");
          setShowWinModal(true);
          return;
        }
      }

      console.log(`🎯 Бот ${botName} завершил ход`);
      botTurnInProgress.current = false;
      setGamePhase("playing");
      nextTurn();
    }, delay);
  };

  // Проверяем, нужно ли сделать ход бота
  useEffect(() => {
    if (gamePhase !== "playing") return;

    // Проверяем окончание игры по раундам
    if (currentRound > 10) {
      setGamePhase("finished");
      setShowWinModal(true);
      return;
    }

    // Проверяем окончание игры по количеству активных игроков
    const activeParticipants = participants.filter((p) => !p.isEliminated);
    if (activeParticipants.length <= 1) {
      console.log("🎉 Игра завершена! Остался только один участник!");
      setGamePhase("finished");
      setShowWinModal(true);
      return;
    }

    const currentPlayer = getCurrentPlayer();
    const currentParticipant = participants.find(
      (p) => p.id === currentPlayer.id
    );

    console.log(
      `🎮 Раунд ${currentRound}/10, Ход: ${currentPlayer.name} ${
        currentPlayer.isUser ? "👤" : "🤖"
      } ${currentParticipant?.isEliminated ? "❌ (выбыл)" : "✅"}`
    );

    // Логируем информацию о выбранных ботах для выбывания
    if (currentRound === 1 && currentPlayerIndex === 0) {
      console.log(
        `🎯 Первый бот для выбывания: ${
          firstBotToEliminate === "alexey" ? "Алексей" : "Олег"
        }`
      );
      console.log(
        `🎯 Второй бот для выбывания: ${
          secondBotToEliminate === "alexey" ? "Алексей" : "Олег"
        }`
      );
    }

    // Логируем информацию о выбывании первого бота
    if (
      firstBotEliminatedRound !== null &&
      currentRound === firstBotEliminatedRound + 1 &&
      currentPlayerIndex === 0
    ) {
      console.log(
        `📅 Первый бот выбыл в раунде ${firstBotEliminatedRound}. Второй бот сможет выбывать с раунда ${
          firstBotEliminatedRound + 2
        }`
      );
    }

    // Если это ход игрока - ничего не делаем (ждем действия пользователя)
    if (currentPlayer.isUser) {
      // Проверяем, что игрок не выбыл (игрок никогда не должен выбывать)
      if (currentParticipant?.isEliminated) {
        console.error(
          "❌ ОШИБКА: Игрок помечен как выбывший! Это не должно происходить."
        );
      }
      return;
    }

    // Если это ход бота - выполняем автоматически (выбывшие делают "ставку +0")
    if (!botTurnInProgress.current) {
      makeBotMove(currentPlayer.id, currentPlayer.name);
    }
  }, [
    currentPlayerIndex,
    currentRound,
    gamePhase,
    auctionData?.type,
    participants,
    firstBotToEliminate,
    secondBotToEliminate,
    firstBotEliminatedRound,
  ]);

  const handleIncreaseBid = useCallback(() => {
    if (gamePhase !== "playing") return;

    const currentPlayer = getCurrentPlayer();

    // Проверяем, что сейчас ход игрока
    if (!currentPlayer.isUser) {
      console.log("❌ Сейчас не ход игрока, игнорируем ставку");
      return;
    }

    const increaseAmount = auctionData?.type === "parking" ? 50000 : 100000;
    const currentUserBid = participants.find((p) => p.isUser)?.bid || 0;
    const remainingBudget = initialBudget - currentUserBid;

    if (remainingBudget < increaseAmount) {
      console.log("❌ Недостаточно бюджета для ставки");
      return;
    }

    console.log(
      `👤 Игрок делает ставку: ${currentUserBid.toLocaleString("ru-RU")} → ${(
        currentUserBid + increaseAmount
      ).toLocaleString("ru-RU")} ₽`
    );

    // Увеличиваем ставку игрока
    setParticipants((prev) =>
      prev.map((p) => (p.isUser ? { ...p, bid: p.bid + increaseAmount } : p))
    );

    // Переходим к следующему ходу
    console.log("✅ Игрок завершил ход, переходим к следующему");
    nextTurn();
  }, [
    gamePhase,
    auctionData?.type,
    initialBudget,
    participants,
    currentPlayerIndex,
  ]);

  // Получаем информацию о текущем игроке (новая логика)
  const getCurrentPlayerInfo = () => {
    const currentPlayer = getCurrentPlayer();
    return {
      currentPlayer,
      isUserTurn: currentPlayer.isUser,
      activeParticipants: participants.filter((p) => !p.isEliminated),
    };
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("ru-RU");
  };

  // Находим максимальную ставку для нормализации высоты баров
  const maxBid = Math.max(...participants.map((p) => p.bid));
  const { currentPlayer, isUserTurn } = getCurrentPlayerInfo();

  return (
    <div className="auction-page">
      <Header />
      <main className="auction-content">
        <div className="auction-container">
          {/* Информация о раунде и ходе */}
          <div className="auction-timer">Раунд {currentRound}/10</div>
          <div className="turn-info">
            {gamePhase === "finished"
              ? "Игра завершена"
              : gamePhase === "waiting_for_bot"
              ? `Ход бота...`
              : isUserTurn
              ? "Ваш ход"
              : `Ход: ${currentPlayer?.name || ""}`}
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
          <button
            className={`increase-bid-button ${
              !isUserTurn || gamePhase !== "playing" ? "disabled" : ""
            }`}
            onClick={handleIncreaseBid}
            disabled={!isUserTurn || gamePhase !== "playing"}
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

import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import { useButtonSound } from "../hooks/useButtonSound";
import VirtualKeyboard from "../components/VirtualKeyboard";
import "./Registration.css";
import starIcon from "../assets/icons/star.svg";
import backgroundVideo from "../assets/images/background-bot-2.MOV";

const Registration: React.FC = () => {
  const { navigateTo, auctionData } = usePageContext();
  const [name, setName] = useState("");
  const playButtonSound = useButtonSound();
  // Удаляем статический баланс, теперь он будет вычисляться динамически
  const [edsReceived, setEdsReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdsLoading, setIsEdsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Функция для расчета баланса (цена объекта + 30%)
  const calculateBalance = (): string => {
    if (!auctionData?.price) {
      return "25 000 000"; // Значение по умолчанию, если данных нет
    }

    const basePrice = auctionData.price;
    const budget = Math.round(basePrice * 1.3); // Добавляем 30%

    // Форматируем число с пробелами
    return budget.toLocaleString("ru-RU").replace(/,/g, " ");
  };

  const handleGetEDS = () => {
    playButtonSound();
    setIsEdsLoading(true);
    setLoadingText("Поднимаем архивы...");

    // Первый текст лоадера
    setTimeout(() => {
      setLoadingText("Проверяем документы...");
    }, 1000);

    // Второй текст лоадера
    setTimeout(() => {
      setLoadingText("Формируем подпись...");
    }, 2000);

    // Третий текст лоадера
    setTimeout(() => {
      setLoadingText("Завершаем процесс...");
    }, 3000);

    // Завершение загрузки и показ анимации заполнения
    setTimeout(() => {
      setIsEdsLoading(false);
      setEdsReceived(true);
      setLoadingText(""); // Очищаем текст после завершения
    }, 4000);
  };

  const handleSubmitApplication = () => {
    if (name.trim()) {
      playButtonSound();
      // Логика подачи заявки
      console.log("Подача заявки:", name);
      setIsLoading(true);
      // Добавляем небольшую задержку для имитации загрузки
      setTimeout(() => {
        navigateTo("auction");
      }, 1500);
    }
  };

  const handleInputClick = () => {
    // Блокируем клик на инпут, если ЭЦП не получена
    if (!edsReceived) return;

    playButtonSound();
    setIsKeyboardVisible(true);
  };

  const handleKeyboardInput = (value: string) => {
    setName(value);
  };

  const handleKeyboardClose = () => {
    setIsKeyboardVisible(false);
  };

  const handleBackClick = useCallback(() => {
    navigateTo("details");
  }, [navigateTo]);

  return (
    <div className="registration-page">
      <Header showBackButton={true} onBackClick={handleBackClick} />
      <main className="registration-content">
        <div className="registration-container">
          <h1 className="registration-title">
            <br />
            <span className="title-part-white">РЕГИСТРАЦИЯ</span>
            <br />
            <span className="title-part-gradient">
              НА УЧАСТИЕ <br /> В АУКЦИОНЕ
            </span>
          </h1>

          <div className="registration-panels">
            {/* Левая панель - Получение ЭЦП */}
            <div
              className={`registration-panel eds-panel ${
                edsReceived ? "eds-received" : ""
              } ${isEdsLoading ? "eds-loading" : ""}`}
            >
              {!edsReceived && !isEdsLoading ? (
                <>
                  <h2 className="panel-title">
                    01. Получение электронной цифровой подписи
                  </h2>
                  <button className="eds-button" onClick={handleGetEDS}>
                    <span>ПОЛУЧИТЬ ЭЦП</span>
                  </button>
                </>
              ) : isEdsLoading ? (
                <>
                  <h2 className="panel-title">
                    01. Получение электронной цифровой подписи
                  </h2>
                  <button className="eds-button loading" disabled>
                    <span>ПОЛУЧЕНИЕ ЭЦП...</span>
                  </button>
                </>
              ) : (
                <div className="eds-success">
                  <img
                    src={starIcon}
                    alt="ЭЦП получена"
                    className="eds-success-icon"
                  />
                  <span className="eds-success-text">ЭЦП получена</span>
                </div>
              )}
            </div>

            {/* Правая панель - Регистрация */}
            <div
              className={`registration-panel form-panel ${
                !edsReceived ? "panel-disabled" : ""
              }`}
            >
              <h2 className="panel-title">02. Регистрация</h2>

              <div className="form-field">
                <label htmlFor="name" className="field-label">
                  Ваше имя
                </label>
                <input
                  id="name"
                  type="text"
                  className="name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onClick={handleInputClick}
                  placeholder="Введите ваше имя"
                  autoComplete="off"
                  readOnly
                  disabled={!edsReceived}
                />
              </div>

              <div className="balance-section">
                <label className="field-label">Ваш баланс, ₽</label>
                <div className="balance-amount">{calculateBalance()}</div>
              </div>

              <button
                className="submit-button"
                onClick={handleSubmitApplication}
                disabled={!name.trim() || isLoading || !edsReceived}
              >
                {isLoading ? (
                  <>
                    <span>ЗАГРУЗКА...</span>
                    <div className="loading-spinner"></div>
                  </>
                ) : (
                  <>
                    <span>ПОДАТЬ ЗАЯВКУ</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {loadingText && (
            <p className="footer-text loading-footer-text">{loadingText}</p>
          )}
        </div>
      </main>
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
      <div className="background-shape"></div>
      <div className="background-shape-2"></div>
      <div className="background-shape-3"></div>

      <VirtualKeyboard
        isVisible={isKeyboardVisible}
        onClose={handleKeyboardClose}
        onInput={handleKeyboardInput}
        currentValue={name}
      />
    </div>
  );
};

export default Registration;

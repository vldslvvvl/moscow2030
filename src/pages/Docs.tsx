import React, { useState } from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import { useButtonSound } from "../hooks/useButtonSound";
import "./Docs.css";
import starIcon from "../assets/icons/star.svg";
import doc1Image from "../assets/images/doc1.jpg";
import doc2Image from "../assets/images/doc2.jpg";
import walletIcon from "../assets/icons/wallet.png";
import arrowsIcon from "../assets/icons/arrows.png";
import backgroundVideo from "../assets/images/background-bot-2.MOV";

const Docs: React.FC = () => {
  const { navigateTo } = usePageContext();
  const playButtonSound = useButtonSound();
  const [edsSigned, setEdsSigned] = useState(false);
  const [isEdsLoading, setIsEdsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<
    "cash" | "mortgage" | null
  >(null);

  const handleSignEDS = () => {
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
      setEdsSigned(true);
      setLoadingText(""); // Очищаем текст после завершения
    }, 4000);
  };

  const handlePaymentSelect = (payment: "cash" | "mortgage") => {
    if (edsSigned) {
      playButtonSound();
      setSelectedPayment(payment);
    }
  };

  const handleFormalize = () => {
    if (edsSigned && selectedPayment) {
      playButtonSound();
      console.log("Оформление с оплатой:", selectedPayment);
      // Переход на страницу завершения
      navigateTo("finish");
    }
  };

  return (
    <div className="docs-page">
      <Header />
      <main className="docs-content">
        <div className="docs-container">
          <h1 className="docs-title">
            <span className="title-part-white">ОФОРМЛЕНИЕ</span>
            <br />
            <span className="title-part-gradient">ДОГОВОРА</span>
          </h1>

          <div className="docs-panels">
            {/* Левая панель - Подписание документов */}
            <div
              className={`docs-panel documents-panel ${
                edsSigned ? "eds-signed" : ""
              } ${isEdsLoading ? "eds-loading" : ""}`}
            >
              <h2 className="panel-title">Подпишите документы</h2>

              {!edsSigned && !isEdsLoading ? (
                <>
                  <div className="documents-list">
                    <div className="document-item">
                      <div className="document-icon">
                        <img
                          src={doc1Image}
                          alt="Договор"
                          width={70}
                          height={60}
                        />
                      </div>
                      <span className="document-name">Договор.pdf</span>
                    </div>
                    <div className="document-item">
                      <div className="document-icon">
                        <img
                          src={doc2Image}
                          alt="Акт приема-передачи"
                          width={70}
                          height={60}
                        />
                      </div>
                      <span className="document-name">
                        Акт приема-передачи.pdf
                      </span>
                    </div>
                  </div>

                  <button className="eds-sign-button" onClick={handleSignEDS}>
                    <span>ПОДПИСАТЬ ЭЦП</span>
                  </button>
                </>
              ) : isEdsLoading ? (
                <>
                  <div className="documents-list">
                    <div className="document-item">
                      <div className="document-icon">
                        <img
                          src={doc1Image}
                          alt="Договор"
                          width={70}
                          height={60}
                        />
                      </div>
                      <span className="document-name">Договор.pdf</span>
                    </div>
                    <div className="document-item">
                      <div className="document-icon">
                        <img
                          src={doc2Image}
                          alt="Акт приема-передачи"
                          width={70}
                          height={60}
                        />
                      </div>
                      <span className="document-name">
                        Акт приема-передачи.pdf
                      </span>
                    </div>
                  </div>
                  <button className="eds-sign-button loading" disabled>
                    <span>ПОДПИСАНИЕ ЭЦП...</span>
                  </button>
                </>
              ) : (
                <div className="eds-success">
                  <img
                    src={starIcon}
                    alt="ЭЦП подписана"
                    className="eds-success-icon"
                  />
                  <span className="eds-success-text">ЭЦП подписана</span>
                </div>
              )}
            </div>

            {/* Правая панель - Выбор способа оплаты */}
            <div className="docs-panel payment-panel">
              <h2 className="panel-title">Выберите способ оплаты</h2>

              <div className="payment-options">
                <div
                  className={`payment-option ${
                    selectedPayment === "cash" ? "selected" : ""
                  } ${!edsSigned ? "disabled" : ""}`}
                  onClick={() => handlePaymentSelect("cash")}
                >
                  <div className="payment-icon">
                    <img src={walletIcon} className="payment-icon-img" />
                  </div>
                  <span className="payment-name">Наличными</span>
                </div>

                <div
                  className={`payment-option ${
                    selectedPayment === "mortgage" ? "selected" : ""
                  } ${!edsSigned ? "disabled" : ""}`}
                  onClick={() => handlePaymentSelect("mortgage")}
                >
                  <div className="payment-icon">
                    <img
                      src={arrowsIcon}
                      alt="Ипотека"
                      className="payment-icon-img"
                    />
                  </div>
                  <span className="payment-name">Ипотека</span>
                </div>
              </div>

              <button
                className={`formalize-button ${
                  !edsSigned || !selectedPayment ? "disabled" : ""
                }`}
                onClick={handleFormalize}
                disabled={!edsSigned || !selectedPayment}
              >
                <span>ОФОРМИТЬ</span>
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
    </div>
  );
};

export default Docs;

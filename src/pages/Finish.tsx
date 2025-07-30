import React, { useCallback } from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import "./Finish.css";
import qrImage from "../assets/images/qr.png";
import backgroundVideo from "../assets/images/background-bot-2.MOV";

const Finish: React.FC = () => {
  const { navigateTo } = usePageContext();

  const handleReturnToCatalog = () => {
    console.log("Возврат в каталог");
    navigateTo("listing");
  };

  const handleBackClick = useCallback(() => {
    navigateTo("docs");
  }, [navigateTo]);

  return (
    <div className="finish-page">
      <Header showBackButton={true} onBackClick={handleBackClick} />
      <main className="finish-content">
        <div className="finish-container">
          <h1 className="finish-title">
            <span className="title-part-white">ПОЗДРАВЛЯЕМ</span>
            <br />
            <span className="title-part-gradient">С ПРИОБРЕТЕНИЕМ</span>
          </h1>

          <div className="finish-instruction">
            Отсканируйте QR-код, чтобы получить баллы
          </div>

          <div className="qr-code-container">
            <img src={qrImage} alt="QR код" className="qr-code" />
          </div>

          <button className="return-button" onClick={handleReturnToCatalog}>
            ВЕРНУТЬСЯ В КАТАЛОГ
          </button>
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

export default Finish;

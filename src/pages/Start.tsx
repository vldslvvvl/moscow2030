import React from "react";
import Header from "../components/Header";
import { usePageContext } from "../context/PageContext";
import "./Start.css";
import videoFile from "../assets/images/background.mp4";

const Start: React.FC = () => {
  const { navigateTo } = usePageContext();

  const handleStartClick = () => {
    navigateTo("introduction");
  };

  return (
    <div className="start-page">
      <Header />
      <main className="start-content">
        <div className="start-content-container">
          <h1 className="start-title" style={{ marginBottom: "64px" }}>
            <span className="white-text">Купи</span> <br />
            <span className="gradient-text">недвижимость</span>
            <br />
            <span className="gradient-text">от города</span>
          </h1>
          <button className="primary-button" onClick={handleStartClick}>
            <p>Начать</p>
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
        <div className="video-container">
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src={videoFile} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </main>
      <div className="background-shape"></div>
      <div className="background-shape-2"></div>
      <div className="background-shape-3"></div>
    </div>
  );
};

export default Start;

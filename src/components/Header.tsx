import React from "react";
import logo from "../assets/logo.svg";
import { useButtonSound } from "../hooks/useButtonSound";
import "./Header.css";

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  onBackClick,
}) => {
  const playButtonSound = useButtonSound();
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="МОСКВА 2030" width="170" height="90" />
      </div>
      <div className="header-actions">
        {showBackButton && (
          <button
            className="back-button"
            onClick={() => {
              playButtonSound();
              onBackClick?.();
            }}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.5846 25H10.418"
                stroke="white"
                stroke-width="4.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M25.0013 39.5846L10.418 25.0013L25.0013 10.418"
                stroke="white"
                stroke-width="4.16667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

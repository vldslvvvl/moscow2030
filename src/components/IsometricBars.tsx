import React from "react";
import "./IsometricBars.css";

interface Participant {
  id: string;
  name: string;
  bid: number;
  isUser: boolean;
}

interface IsometricBarsProps {
  participants: Participant[];
  maxBid: number;
}

const IsometricBars: React.FC<IsometricBarsProps> = ({
  participants,
  maxBid,
}) => {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("ru-RU");
  };

  return (
    <div className="isometric-bars-container">
      {/* Значения ставок */}
      <div className="bid-values">
        {participants.map((participant) => (
          <div key={participant.id} className="bid-value">
            {formatCurrency(participant.bid)} ₽
          </div>
        ))}
      </div>

      {/* Изометрические бары */}
      <div className="bars-wrapper">
        {participants.map((participant, index) => {
          const height = (participant.bid / maxBid) * 100; // Процент от максимальной высоты

          return (
            <div
              key={participant.id}
              className="bar-container"
              style={{ "--bar-height": `${height}%` } as React.CSSProperties}
            >
              <div
                className={`isometric-bar ${
                  participant.isUser ? "user-bar" : "other-bar"
                }`}
              >
                {/* Передняя грань */}
                <div className="bar-face front"></div>
                {/* Верхняя грань */}
                <div className="bar-face top"></div>
                {/* Правая грань */}
                <div className="bar-face right"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Имена участников */}
      <div className="participant-names">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className={`participant-name ${
              participant.isUser ? "user-name" : "other-name"
            }`}
          >
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IsometricBars;

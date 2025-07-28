import React from "react";

interface Participant {
  id: string;
  name: string;
  bid: number;
  isUser: boolean;
}

interface SimpleBarsProps {
  participants: Participant[];
  maxBid: number;
}

const SimpleBars: React.FC<SimpleBarsProps> = ({ participants, maxBid }) => {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("ru-RU");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "60px",
        position: "relative",
      }}
    >
      {participants.map((participant) => {
        const height = (participant.bid / maxBid) * 300; // 300px максимум

        return (
          <div
            key={participant.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Значение ставки */}
            <div
              style={{
                color: "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {formatCurrency(participant.bid)} ₽
            </div>

            {/* Бар */}
            <div
              style={{
                width: "80px",
                height: `${height}px`,
                background: participant.isUser
                  ? "linear-gradient(180deg, #00CAF1 0%, #0A8BB5 100%)"
                  : "linear-gradient(180deg, #4A4A5A 0%, #2A2A3A 100%)",
                borderRadius: "8px",
                transition: "all 0.5s ease",
                boxShadow: participant.isUser
                  ? "0 0 20px rgba(0, 202, 241, 0.4)"
                  : "0 4px 20px rgba(0, 0, 0, 0.3)",
                position: "relative",
              }}
            >
              {/* Блик сверху */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "20px",
                  background: participant.isUser
                    ? "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                  borderRadius: "8px 8px 0 0",
                }}
              />
            </div>

            {/* Имя участника */}
            <div
              style={{
                color: participant.isUser ? "#00CAF1" : "#FFFFFF",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {participant.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SimpleBars;

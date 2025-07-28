import React from "react";
import { usePageContext } from "../context/PageContext";
import "./LoseModal.css";

interface LoseModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBudget: number;
}

const LoseModal: React.FC<LoseModalProps> = ({
  isOpen,
  onClose,
  userBudget,
}) => {
  const { navigateTo } = usePageContext();

  const handleChooseAnother = () => {
    navigateTo("listing");
  };

  const handleStay = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="lose-modal-overlay">
      <div className="lose-modal">
        {/* Заголовок */}
        <div className="lose-title">
          <h1 className="lose-title-main">
            УПС!{" "}
            <span className="highlight-blue">
              <br />
              СТАВКА ПРЕВЫСИЛА ВАШ БЮДЖЕТ
            </span>{" "}
          </h1>
        </div>

        {/* Сообщение */}
        <div className="lose-message">
          <p>
            Ваш задаток ({userBudget.toLocaleString("ru-RU")} ₽) возвращен —{" "}
            <br /> <span className="highlight-blue">вы ничего не потеряли</span>
          </p>
        </div>

        {/* Вопрос */}
        <div className="lose-question">
          <p>Хотите выбрать другой лот?</p>
        </div>

        {/* Кнопки */}
        <div className="lose-buttons">
          <button
            className="lose-button yes-button"
            onClick={handleChooseAnother}
          >
            Сыграть еще раз
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseModal;

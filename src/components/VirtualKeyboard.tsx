import React, { useState } from "react";
import "./VirtualKeyboard.css";

interface VirtualKeyboardProps {
  isVisible: boolean;
  onClose: () => void;
  onInput: (value: string) => void;
  currentValue: string;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  isVisible,
  onClose,
  onInput,
  currentValue,
}) => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);

  const russianLayout = {
    default: [
      ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
      ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
      ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."],
    ],
    shift: [
      ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
      ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
      ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "."],
    ],
  };

  const specialKeys = [
    { key: "123", label: "123", type: "function" },
    { key: "space", label: "Пробел", type: "space" },
    { key: "backspace", label: "⌫", type: "backspace" },
    { key: "shift", label: "⇧", type: "shift" },
    { key: "done", label: "Готово", type: "done" },
  ];

  const handleKeyPress = (key: string) => {
    switch (key) {
      case "backspace":
        onInput(currentValue.slice(0, -1));
        break;
      case "space":
        onInput(currentValue + " ");
        break;
      case "shift":
        setIsShiftPressed(!isShiftPressed);
        break;
      case "done":
        onClose();
        break;
      default:
        const char = isShiftPressed || isCapsLock ? key.toUpperCase() : key;
        onInput(currentValue + char);
        if (isShiftPressed) {
          setIsShiftPressed(false);
        }
        break;
    }
  };

  const currentLayout =
    isShiftPressed || isCapsLock ? russianLayout.shift : russianLayout.default;

  if (!isVisible) return null;

  return (
    <div className="virtual-keyboard-overlay">
      <div className="virtual-keyboard">
        <div className="keyboard-layout">
          {/* Основные клавиши */}
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((key) => (
                <button
                  key={key}
                  className="keyboard-key"
                  onClick={() => handleKeyPress(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}

          {/* Специальные клавиши */}
          <div className="keyboard-row special-keys">
            <button
              className={`keyboard-key special-key ${
                isShiftPressed ? "active" : ""
              }`}
              onClick={() => handleKeyPress("shift")}
            >
              ⇧
            </button>
            <button
              className="keyboard-key space-key"
              onClick={() => handleKeyPress("space")}
            >
              Пробел
            </button>
            <button
              className="keyboard-key special-key"
              onClick={() => handleKeyPress("backspace")}
            >
              ⌫
            </button>
            <button
              className="keyboard-key done-key"
              onClick={() => handleKeyPress("done")}
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;

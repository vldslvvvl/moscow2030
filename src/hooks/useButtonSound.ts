import { useCallback } from 'react';
import buttonSound from '../assets/audio/button_sound.mp3';

export const useButtonSound = () => {
  const playButtonSound = useCallback(() => {
    const audio = new Audio(buttonSound);
    audio.volume = 0.5; // Устанавливаем громкость на 50%
    audio.play().catch(error => {
      // Игнорируем ошибки воспроизведения, так как они могут возникать
      // если пользователь не взаимодействовал со страницей
      console.log('Ошибка воспроизведения звука:', error);
    });
  }, []);

  return playButtonSound;
};
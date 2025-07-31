import { useEffect, useRef, useCallback } from 'react';

interface UseIdleTimerOptions {
  timeout: number; // время в миллисекундах
  onIdle: () => void;
  disabled?: boolean; // возможность отключить таймер
}

export const useIdleTimer = ({ timeout, onIdle, disabled = false }: UseIdleTimerOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onIdleRef = useRef(onIdle);

  // Обновляем ref при изменении колбэка
  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  // Сброс таймера
  const resetTimer = useCallback(() => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onIdleRef.current();
    }, timeout);
  }, [timeout, disabled]);

  // Очистка таймера
  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (disabled) {
      clearTimer();
      return;
    }

    // События для отслеживания активности пользователя
    const events = [
      'mousedown',
      'mousemove', 
      'click',
      'scroll',
      'keypress',
      'keydown',
      'touchstart',
      'touchmove',
      'touchend',
      'visibilitychange' // отслеживаем переключение вкладок
    ];

    // Обработчик событий активности
    const handleActivity = () => {
      resetTimer();
    };

    // Добавляем слушатели событий
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Запускаем таймер при инициализации
    resetTimer();

    // Очищаем слушатели и таймер при размонтировании
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearTimer();
    };
  }, [resetTimer, clearTimer, disabled]);

  return {
    resetTimer,
    clearTimer
  };
};
import { useState, useEffect } from "react";

export const useLayoutStorage = () => {
  // Инициализация состояния
  const [storage, setStorage] = useState(() => {
    try {
      const saved = localStorage.getItem('layout');
      return saved ? JSON.parse(saved) : {
        events: {},
        openSidebar: false,
        eventorFlowDirection: 0
      };
    } catch (e) {
      console.error("Failed to parse localStorage", e);
      return {
        events: {},
        openSidebar: false,
        eventorFlowDirection: 0
      };
    }
  });

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'layout') {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : null;
          if (newValue) {
            setStorage(prev => ({
              ...prev,
              ...newValue
            }));
          }
        } catch (error) {
          console.error("Storage parse error:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Обновление localStorage при изменении состояния
  useEffect(() => {
    localStorage.setItem('layout', JSON.stringify(storage));
  }, [storage]);

  // 🔹 Геттеры
  const getOpenSidebar = () => {
    const saved = localStorage.getItem('layout');
    if (saved ){
        return JSON.parse(saved)?.openSidebar;
    } else {
        return false;
    }
  };
  const getEventorFlowDirection = () => storage.eventorFlowDirection ?? 0;

  // 🔹 Сеттеры
  const setOpenSidebar = (value) => {
    const newValue = Boolean(value);
    setStorage(prev => {
        // 🔥 Принудительно создаём новый объект, даже если значение то же
        const newState = { ...prev, openSidebar: newValue };
        localStorage.setItem('layout', JSON.stringify(newState));
        return newState;
    });
};
//   const setOpenSidebar = (value) => {
//     setStorage(prev => {
//       const newState = { ...prev, openSidebar: Boolean(value) };
//       localStorage.setItem('layout', JSON.stringify(newState));
//       return newState;
//     });
//   };

  const setEventorFlowDirection = (value) => {
    // Ограничиваем значение (например, от 0 до 2)
    const clampedValue = Math.max(0, Math.min(2, Number(value)));
    setStorage(prev => {
      const newState = { ...prev, eventorFlowDirection: clampedValue };
      localStorage.setItem('layout', JSON.stringify(newState));
      return newState;
    });
  };

  // 🔹 Универсальный геттер для событий (оставил как в оригинале)
  const getEvents = () => Object.values(storage.events || {});

  return {
    // Состояние
    storage,

    // Геттеры
    getOpenSidebar,
    getEventorFlowDirection,
    getEvents,

    // Сеттеры
    setOpenSidebar,
    setEventorFlowDirection,

    // Полный контроль (опционально)
    setStorage,
  };
};
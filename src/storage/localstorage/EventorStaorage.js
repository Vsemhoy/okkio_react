import { useState, useEffect } from "react";

export const useEventorStorage = () => {
  // Инициализация состояния
  const [storage, setStorage] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('eventor')) || { events: {} };
    } catch (e) {
      console.error("Failed to parse localStorage", e);
      return { events: {} };
    }
  });

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'eventor') {
        try {
          setStorage(JSON.parse(e.newValue) || { events: {} });
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
    localStorage.setItem('eventor', JSON.stringify(storage));
  }, [storage]);

  // Методы для работы с событиями
  const addEvent = (id, eventData) => {
    setStorage(prev => ({
      ...prev,
      events: {
        ...prev.events,
        [id]: { ...eventData, id, createdAt: new Date().toISOString() }
      }
    }));
  };

    const updateEvent = (id, eventData) => {
        setStorage(prev => {
            // Проверяем существование события
            if (!prev.events[id]) {
            console.warn(`Event with id ${id} not found`);
            return prev; // Возвращаем предыдущее состояние без изменений
            }

            return {
            ...prev,
            events: {
                ...prev.events,
                [id]: { 
                ...prev.events[id], // Сохраняем существующие данные
                ...eventData,       // Обновляем только переданные поля
                updatedAt: new Date().toISOString() // Добавляем метку обновления
                }
            }
            };
        });
    };

  const getEvent = (id) => {
    return storage.events[id] || null;
  };

const getEvents = ({ start, end, section } = {}) => {
  // Используем функциональное обновление, чтобы получить актуальное состояние
  setStorage(prev => {
    let events = Object.values(prev.events || {});

    if (start) {
      events = events.filter(e => new Date(e.start) >= new Date(start));
    }

    if (end) {
      events = events.filter(e => new Date(e.end) <= new Date(end));
    }

    if (section) {
      events = events.filter(e => e.section === section);
    }

    return prev; // Не изменяем состояние, просто используем актуальные данные
  });

  // Но поскольку setStorage не возвращает значение, лучше переписать по-другому:
  const currentStorage = JSON.parse(localStorage.getItem('eventor')) || { events: {} };
  let events = Object.values(currentStorage.events || {});

  if (start) {
    events = events.filter(e => new Date(e.start) >= new Date(start));
  }

  if (end) {
    events = events.filter(e => new Date(e.end) <= new Date(end));
  }

  if (section) {
    events = events.filter(e => e.section === section);
  }

  return events;
};

  const removeEvent = (id) => {
    setStorage(prev => {
      const { [id]: _, ...rest } = prev.events;
      return { ...prev, events: rest };
    });
  };

  return {
    events: storage.events,
    addEvent,
    getEvent,
    getEvents,
    removeEvent,
    updateEvent,
    clearAll: () => setStorage({ events: {} })
  };
};
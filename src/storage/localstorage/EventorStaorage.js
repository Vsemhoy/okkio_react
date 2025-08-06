import dayjs from "dayjs";
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
          setStorage(JSON.parse(e.newValue) || { events: {}, sections: {}, evtypes: {}, categories: {}, projects: {}, drafts: {} });
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


  /** ------------------------ EVENTS ------------------------- */
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
        console.log('id', id)
        console.log('storage.events', storage.events)
        return storage.events[id] || null;
    };

    const getEvents = ({ start, end, section } = {}) => {
    // Используем функциональное обновление, чтобы получить актуальное состояние
        // setStorage(prev => {
        //     let events = Object.values(prev.events || {});

        //     return prev; // Не изменяем состояние, просто используем актуальные данные
        // });

        // Но поскольку setStorage не возвращает значение, лучше переписать по-другому:
        const currentStorage = JSON.parse(localStorage.getItem('eventor')) || { events: {} };
        let events = Object.values(currentStorage.events || {});
        if (start) {
          events = events.filter(e => dayjs(e.start) >= dayjs(start).startOf('day'));
        }
        
        if (end) {
          events = events.filter(e => dayjs(e.end) <= dayjs(end).startOf('day'));
        }
        if (section) {
          if (section === "NULL"){
            section = null;
          }
          if (section  !== 'ALL'){
            events = events.filter(e => e.section_id === section);
          } 
        }
        return events;
    };

  const removeEvent = (id) => {
    setStorage(prev => {
      const { [id]: _, ...rest } = prev.events;
      return { ...prev, events: rest };
    });
  };






    /** ------------------------ !!! EVENTS ------------------------- */

    /** ------------------------ SECTIONS ------------------------- */
    const addSection = (id, eventData) => {
        setStorage(prev => ({
        ...prev,
        sections: {
            ...prev.sections,
            [id]: { ...eventData, id, createdAt: new Date().toISOString() }
        }
        }));
    };

        const updateSection = (id, eventData) => {
            setStorage(prev => {
                // Проверяем существование события
                if (!prev.sections[id]) {
                console.warn(`Section with id ${id} not found`);
                return prev; // Возвращаем предыдущее состояние без изменений
                }

                return {
                ...prev,
                sections: {
                    ...prev.sections,
                    [id]: { 
                    ...prev.sections[id], // Сохраняем существующие данные
                    ...eventData,       // Обновляем только переданные поля
                    updatedAt: new Date().toISOString() // Добавляем метку обновления
                    }
                }
                };
            });
        };

        const getSection = (id) => {
            return storage.sections[id] || null;
        };

        const getSections = ({ start, end, section } = {}) => {
        // Используем функциональное обновление, чтобы получить актуальное состояние
            setStorage(prev => {
                let sections = Object.values(prev.sections || {});

                if (start) {
                sections = sections.filter(e => new Date(e.start) >= new Date(start));
                }

                if (end) {
                sections = sections.filter(e => new Date(e.end) <= new Date(end));
                }

                if (section) {
                sections = sections.filter(e => e.section === section);
                }

                return prev; // Не изменяем состояние, просто используем актуальные данные
            });

            // Но поскольку setStorage не возвращает значение, лучше переписать по-другому:
            const currentStorage = JSON.parse(localStorage.getItem('eventor')) || { sections: {} };
            let sections = Object.values(currentStorage.sections || {});

            if (start) {
                sections = sections.filter(e => new Date(e.start) >= new Date(start));
            }

            if (end) {
                sections = sections.filter(e => new Date(e.end) <= new Date(end));
            }

            if (section) {
                sections = sections.filter(e => e.section === section);
            }

            return sections;
        };

    const removeSection = (id) => {
        setStorage(prev => {
        const { [id]: _, ...rest } = prev.sections;
        return { ...prev, sections: rest };
        });
    };
    /** ------------------------ !!! SECTIONS ------------------------- */

    /** ------------------------ TYPES ------------------------- */
        const addEvtype = (id, eventData) => {
        setStorage(prev => ({
        ...prev,
        evtypes: {
            ...prev.evtypes,
            [id]: { ...eventData, id, createdAt: new Date().toISOString() }
        }
        }));
    };

        const updateEvtype = (id, eventData) => {
            setStorage(prev => {
                // Проверяем существование события
                if (!prev.evtypes[id]) {
                console.warn(`Evtype with id ${id} not found`);
                return prev; // Возвращаем предыдущее состояние без изменений
                }

                return {
                ...prev,
                evtypes: {
                    ...prev.evtypes,
                    [id]: { 
                    ...prev.evtypes[id], // Сохраняем существующие данные
                    ...eventData,       // Обновляем только переданные поля
                    updatedAt: new Date().toISOString() // Добавляем метку обновления
                    }
                }
                };
            });
        };

        const getEvtype = (id) => {
            return storage.evtypes[id] || null;
        };

        const getEvtypes = ({ start, end, section } = {}) => {
        // Используем функциональное обновление, чтобы получить актуальное состояние
            setStorage(prev => {
                let evtypes = Object.values(prev.evtypes || {});

                if (start) {
                evtypes = evtypes.filter(e => new Date(e.start) >= new Date(start));
                }

                if (end) {
                evtypes = evtypes.filter(e => new Date(e.end) <= new Date(end));
                }

                if (section) {
                evtypes = evtypes.filter(e => e.section === section);
                }

                return prev; // Не изменяем состояние, просто используем актуальные данные
            });

            // Но поскольку setStorage не возвращает значение, лучше переписать по-другому:
            const currentStorage = JSON.parse(localStorage.getItem('eventor')) || { evtypes: {} };
            let evtypes = Object.values(currentStorage.evtypes || {});

            if (start) {
                evtypes = evtypes.filter(e => new Date(e.start) >= new Date(start));
            }

            if (end) {
                evtypes = evtypes.filter(e => new Date(e.end) <= new Date(end));
            }

            if (section) {
                evtypes = evtypes.filter(e => e.section === section);
            }

            return evtypes;
        };

    const removeEvtype = (id) => {
        setStorage(prev => {
        const { [id]: _, ...rest } = prev.evtypes;
        return { ...prev, evtypes: rest };
        });
    };
    /** ------------------------ !!! EVTYPES ------------------------- */

    /** ------------------------ CATEGORIES ------------------------- */
    
    /** ------------------------ !!! CATEGORIES ------------------------- */

    /** ------------------------ PROJECTS ------------------------- */
    
    /** ------------------------ !!! PROJECTS ------------------------- */

    /** ------------------------ DRAFTS ------------------------- */
    
    /** ------------------------ !!! DRAFTS ------------------------- */



  return {
    events: storage.events,
    sections: storage.sections,
    evtypes: storage.evtypes,
    addEvent,
    getEvent,
    getEvents,
    removeEvent,
    updateEvent,

    addSection,
    getSection,
    getSections,
    removeSection,
    updateSection,

    addEvtype,
    getEvtype,
    getEvtypes,
    removeEvtype,
    updateEvtype,

    clearAll: () => setStorage({ events: {} })
  };
};
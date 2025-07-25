import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { PROD_AXIOS_INSTANCE } from '../API/API';

export const useAuthMonitor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('jwt');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
          setIsAuthenticated(false);
          Cookies.remove('jwt');
          // localStorage.removeItem('user');
          return;
        }

        // Опционально: проверяем токен через API
        await PROD_AXIOS_INSTANCE.post('/auth/validate', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('VALIDATE ME', token);
        setIsAuthenticated(true);
      } catch (error) {
        handleLogout();
        console.log('VALIDTATE UN');
      }
    };

    // Проверяем сразу при монтировании
    checkAuth();

    // Периодическая проверка (каждые 5 минут)
    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    Cookies.remove('jwt');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, handleLogout };
};
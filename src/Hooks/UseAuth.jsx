import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { PROD_AXIOS_INSTANCE } from '../API/API';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    // Инициализация при загрузке
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            
            // Проверяем срок действия куки
            if (!Cookies.get('jwt')) {
                logout();
            }
        }
    }, []);

    const login = (responseData) => {
        // 1. Сохраняем токен в куки (expires в секундах)
        Cookies.set('jwt', responseData.token_metadata.token, {
            expires: new Date(responseData.token_metadata.expires_timestamp),
            secure: true,
            sameSite: 'Strict'
        });

        // 2. Сохраняем пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(responseData.user));
        setUser(responseData.user);

        // 3. Автологин при истечении куки
        const expiresIn = responseData.token_metadata.expires_timestamp - Date.now();
        setTimeout(logout, expiresIn);
    };

    const logout = () => {
        Cookies.remove('jwt');
        localStorage.removeItem('user');
        setUser(null);
    };

    return { user, login, logout };
};

    export const logout = async (clear = true) => {
        const token = Cookies.get('jwt');
        console.log('token', token);
        
        try {
            const response = await PROD_AXIOS_INSTANCE.post('/auth/logout', {}, 
                {
                    headers: { 'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + token
                    },
                }
            )
            if (response){
                Cookies.remove('jwt');
                if (clear){
                    localStorage.removeItem('user');
                    localStorage.removeItem('eventor');
                }
                return(true);
            }
        } catch (e) {
            console.log('e', e)
            return(false);
        }
    };
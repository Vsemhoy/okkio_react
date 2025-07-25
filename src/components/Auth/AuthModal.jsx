import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../Hooks/UseAuth';
import { PROD_AXIOS_INSTANCE } from '../../API/API';
import Cookies from "js-cookie";

const AuthModal = ({ visible, onClose, onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (values) => {
        setLoading(true);
        let success = false;
        let token = null;
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/auth/login', 
                values,
            );
            if (response.data) {
            // Сохраняем токен из ответа
            console.log('response.data', response.data)
                if (response.data?.access_token) {
                    Cookies.set('jwt', response.data.access_token, {
                        secure: true,
                        sameSite: 'Strict'
                    });
                    success = true;
                    token =  response.data.access_token;
                } else {
                    Cookies.remove('jwt');
                }
                
                // Сохраняем пользователя
                // localStorage.setItem('user', JSON.stringify(response.data.user));
            }
          } catch (e) {
              console.log(e);
              if (e.response) {
                    console.log('Server responded with:', e.response.status);
                }
            } finally {
                setLoading(false);
                console.log('success', success)
                if (success){
                    const res_2 = await PROD_AXIOS_INSTANCE.post('/auth/me', {},
                        {
                            headers: { 'Content-Type': 'application/json',
                                'Authorization' : 'Bearer ' + token
                            },
                        }
                    );
                    if (res_2 && res_2.data?.user){
                        localStorage.setItem('user', JSON.stringify(res_2.data.user));
                        if (onLoginSuccess){
                            onLoginSuccess(token, res_2.data.user);
                        }    
                    }
                }
            }
    };



  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 1. Отправка данных на бэкенд
      const response = await fetch('http://okkioserv/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

    // const response = await fetch('http://okkioserv/api/cors-test', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    //     // body: JSON.stringify(values),
    //   });



      const data = await response.json();

      // 2. Обработка ошибок
      if (!response.ok) throw new Error(data.error || 'Ошибка авторизации');

      // 3. Сохраняем токен в localStorage (минимум кода!)
      localStorage.setItem('jwt', data.access_token);

      if (data.access_token){
        const response_2 = await fetch('http://okkioserv/api/auth/me', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + data.access_token
            },
        });
        console.log('response_2', response_2)
      }

      
      message.success('Вход выполнен!');
      onLoginSuccess(); // Опционально: обновляем состояние в родительском компоненте
      onClose();

    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Вход"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Form onFinish={handleLogin}>
        <Form.Item name="email" rules={[{ required: true, message: 'Введите email' }]}>
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          loading={loading}
          block
          onClick={()=>{setLoading(false);}}
        >
          Войти
        </Button>
        <p>{localStorage.getItem('jwt')}</p>
      </Form>
    </Modal>
  );
};

export default AuthModal;
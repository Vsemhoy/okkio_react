import React, { useEffect, useState } from 'react';
import './bsod.css'; // Стили для синего экрана
import { useFetcher } from 'react-router-dom';

const BSOD = (props) => {
  const [isBSOD, setIsBSOD] = useState(false);

    useEffect(()=>{
        setIsBSOD(props.open);
    },[props.open])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F1') {
        e.preventDefault(); // Предотвращаем стандартное действие F1
        setIsBSOD(true);
        enterBsodScreen(); // Пытаемся войти в полноэкранный режим
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const enterBsodScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn("Полноэкранный режим заблокирован:", err);
      });
    }
  };

  if (!isBSOD) return null;

  return (
    <div className="bsod-screen">
      <h1>:(</h1>
      <p>Произошла критическая ошибка.</p>
      <p>Код ошибки: 0x0000007E</p>
      <p>Пожалуйста, перезагрузите компьютер.</p>
      <p style={{ fontSize: '0.8em', marginTop: '20px' }}>
        Если это повторяется, обратитесь к администратору.
      </p>
    </div>
  );
};

export default BSOD;
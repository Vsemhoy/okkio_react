import React, { useEffect, useState } from "react";

import './style/inputcontenteditable.css'

const InputContentEditable = ({ value, onChange, onClose, editmode }) => {
  const divRef = React.useRef();
    const [editMode, seteditMode] = useState(editmode ? editmode : false);

 const handleInput = () => {
    const text = divRef.current.innerText.replace(/\n/g, '');
    onChange(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      seteditMode(false);
    }
    if (e.key === 'Escape') {
      seteditMode(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    // Получаем только текст из буфера обмена
    const text = e.clipboardData.getData('text/plain');

    // Вставляем текст вручную в позицию курсора
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    selection.deleteFromDocument();

    const range = selection.getRangeAt(0);
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Сдвигаем курсор после вставленного текста
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    // Обновляем состояние
    onChange(divRef.current.innerText.replace(/\n/g, ''));
  };

  React.useEffect(() => {
    if (divRef.current && divRef.current.innerText !== value) {
      divRef.current.innerText = value;
    }
  }, [value]);


  useEffect(() => {
    if (!editMode){
        console.log('save', divRef.current.innerText.replace(/\n/g, ''))
        if (onClose){
            onClose(divRef.current.innerText.replace(/\n/g, ''));
        }
    }
  }, [editMode]);

  const handleMouseDown = (ev)=> {
    if (ev.button === 1 || ev.ctrlKey){
        ev.preventDefault();
            seteditMode(!editMode);
    }
  }

  return (
    <div
        onPaste={handlePaste}
        onMouseDown={handleMouseDown}
        className={`input-contenteditable  ${editMode ? 'input-ced-editmode' : ''}`}
      ref={divRef}
      contentEditable={editMode}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      style={{
        minHeight: '24px',
        // border: '1px solid #d9d9d9',
        
        cursor: 'text',
        outline: 'none',
        whiteSpace: 'normal',      // перенос слов
        wordBreak: 'break-word',   // перенос слов при необходимости
        overflowWrap: 'break-word',
        maxWidth: '100%',          // чтобы не выходил за контейнер
      }}
    />
  );
};

export default InputContentEditable;
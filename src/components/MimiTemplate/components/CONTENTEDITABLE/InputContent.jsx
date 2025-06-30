import React, { useEffect, useState } from "react";

import './style/inputcontenteditable.css'
import { Input } from "antd";

const InputContent = ({ value, onChange, onClose, editmode, disabled }) => {
  const inputRef = React.useRef();
    const [editMode, seteditMode] = useState(editmode ? editmode : false);
    const [disableEdit, setDisableEdit] = useState(disabled ? disabled : false);
    const [inputText, setInputText] = useState(value);



  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      seteditMode(false);
      if (onChange){
        if (inputText.trim() === ''){
            setInputText('Untitled');
            onChange('Untitled');
        } else {
            onChange(inputText);
        }
      }
    }
    if (e.key === 'Escape') {
        setInputText(value);
      seteditMode(false);
    }
  };


  const handleBlur = () => {
    if (onChange){
        seteditMode(false)
        if (inputText.trim() === ''){
            setInputText('Untitled');
            onChange('Untitled');
        } else {
            onChange(inputText);
        }
    }
  }



  const handleMouseDown = (ev)=> {
    if (ev.ctrlKey){ //ev.button === 1 || 
        ev.preventDefault();
            seteditMode(!editMode);
    }
  }

  const handleDoubleClick = () => {
    if (!disableEdit){
        seteditMode(true);
    }
  }

useEffect(() => {
  if (editMode && inputRef.current) {
    inputRef.current.focus();
    
    // Опционально: выделяем весь текст при фокусе
    inputRef.current.select();
  }
}, [editMode]);

  return (
    <div>
        {editMode ? (
            <Input
                className={'input-edited-mode-ce'}
                value={inputText}
                bordered={false}
                maxLength={255}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                onChange={(ev)=>{setInputText(ev.target.value)}}
                onBlur={handleBlur}
                />
        ) : (
            <div
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                className={`input-contenteditable  ${editMode ? 'input-ced-editmode' : ''}`}
                style={{
                minHeight: '24px',
                cursor: 'text',
                outline: 'none',
                whiteSpace: 'normal',      // перенос слов
                wordBreak: 'break-word',   // перенос слов при необходимости
                overflowWrap: 'break-word',
                maxWidth: '100%',          // чтобы не выходил за контейнер
            }}
            >{inputText}</div>
        )}
    </div>
    
  );
};

export default InputContent;
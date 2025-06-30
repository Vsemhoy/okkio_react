import React, { useEffect, useState } from 'react';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Button, Checkbox, Modal, Select, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import FilterRow from './../../../../Components/MimiTemplate/components/FORMS/FilterRow';
import BSOD from '../../../../Components/MimiTemplate/commoncom/BSOD/BsodPage';



const QuestModal = (props) => {
  const [open, setOpen] = useState(false);

    const [text, setText] = useState('');


    const [isMarkdown, setIsMarkdown] = useState(false);

    const [openBsod, setOpenBsod] = useState(false);


    useEffect(()=>{
        setText(props.text);
    },[props.text]);





    const handleDiscard = () => {
        if (props.on_discard){
            props.on_discard();
        }
    };

        const handleSave = () => {
        if (props.on_save){
            props.on_save(text);
        }
    };

    const handleFormatChange = (value) => {
        setIsMarkdown(value);
        if (props.on_change_format){
            props.on_change_format(value);
        }
    }

    const handleTextChange = (value) => {
        setText(value);
    }
    useEffect(()=>{
        setOpen(props.set_open);
    },[props.set_open]);

    const handleModalClose = () => {
        if (props.on_close){
            props.on_close();
            setOpen(false);
        }
    }




  return (
    <>

      <Modal
        title="Вопрос разработчикам"
        centered
        open={open}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={1000}

        footer={[
          <Button
            onClick={handleModalClose}
          >
          Закрыть
          </Button>,
          <Button type={'primary'}

          >
          Сохранить
          </Button>

        ]}
      >
        
        <div className={'mi-layout-rightsidebar-mini'}> 
            <div>
                {isMarkdown ? (
                    <MDEditor
                        className="markdown-body--light"
                        value={text}
                        onChange={handleTextChange}
                        preview={'edit'}
                        commands={[
                            commands.bold,
                            commands.italic,
                            commands.strikethrough,
                            commands.hr,
                            commands.divider,
                            commands.title3,
                            commands.title4,
                            commands.divider,
                            commands.link,
                            commands.issue,
                            commands.quote,
                            commands.code,
                            commands.codeBlock,
                            commands.comment,
                            commands.image,
                            commands.table,
                            commands.divider,
                            commands.unorderedListCommand,
                            commands.orderedListCommand,
                            commands.checkedListCommand,
                            commands.divider,
                            commands.help
                        ]}
                        visibleEditors={['code','preview']}
                    />
                ) : (
                    <TextArea style={{minHeight: '200px'}}
                        value={text}
                        onChange={(ev)=>{handleTextChange(ev.target.value)}}
                    />
                )}

                <div className={'mi-grid-2col'}>
                    <FilterRow label={'Проект'}>
                        <Select style={{width: '100%'}}/>
                    </FilterRow>
                    <FilterRow label={'Раздел'}>
                        <Select style={{width: '100%'}}/>
                    </FilterRow>
                </div>

                <div className={'mi-grid-2col'}>
                    <FilterRow label={'Приоритет'}>
                        <Select style={{width: '100%'}}/>
                    </FilterRow>
                    <FilterRow label={'Видимость'}>
                        <Select style={{width: '100%'}}/>
                    </FilterRow>
                </div>
            </div>
                <div className={'mi-bg-base mi-pa-12'}>
                    <FilterRow >
                        <Switch 
                        checkedChildren="Markdown" 
                        unCheckedChildren="Text" defaultChecked
                            value={isMarkdown}
                            onChange={(val)=>{handleFormatChange(val)}}
                        />
                    </FilterRow>
                    <FilterRow >
                        <Checkbox >Опубликовано (неопубликованные комменты видны только вам)</Checkbox>
                    </FilterRow>
                    <FilterRow >
                        <Checkbox >Скрыто от всех, кроме разработчиков</Checkbox>
                    </FilterRow>
                    <FilterRow >
                        <Checkbox >Выделить цветом</Checkbox>
                    </FilterRow>
                    <FilterRow >
                        <Button danger block
                            onClick={()=>{setOpenBsod(!openBsod)}}
                        >
                            Вопрос решен
                        </Button>
                    </FilterRow>
                                      
                </div>
        </div>
                <BSOD open={openBsod} />
      </Modal>
    </>
  );
};
export default QuestModal;
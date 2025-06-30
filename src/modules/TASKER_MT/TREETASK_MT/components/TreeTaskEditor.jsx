import React, { useEffect, useState } from 'react';
import { MOCK_TREETASK } from '../MOCK_TREETASK';
import MDEditor, { commands } from "@uiw/react-md-editor";
import { Button } from 'antd';
import TreeTaskEditorSettingsForm from './TreeTaskEditorSettingsForm';

const TreeTaskEditor = (props) => {
    const [title, setTitle] = useState(props.data?.title);
    const [itemId, setItemId] = useState(props.data?.id);

    const [content, setContent] = useState(MOCK_TREETASK);
    const [prevContent, setPrevContent] = useState('');
    const [editMode, setEditMode] = useState(props.editMode ? props.editMode : 0);

    const handleContentChange = (value) => {
        setContent(value);
    }

    useEffect(() => {
      setTitle(props.data?.title);
      setItemId(props.data?.id);
    }, [props.data]);

    const handleEditmodeOn = ()=>{
        setPrevContent(content);
        setEditMode(1);
    }
    const handleDiscard = ()=>{
        setContent(prevContent);
        setEditMode(0);
    }

  return (
    <div className='mi-flat-task-cross-editor'>
        <div className={'mi-pa-12'}
            style={{borderBottom: '1px solid gray'}}
        >
            <h2>{title}</h2>
            <div className={'mi-flex-space'}>
                <div>
                    j
                </div>f
                <div>
                    {editMode ? (
                        <div className={'mi-flex-gap'}>
                        <Button size={'small'} type={'default'} shape={'round'}
                            onClick={handleDiscard}
                        >Отменить</Button> 
                        <Button size={'small'} type={'primary'} shape={'round'}
                            onClick={()=>{setEditMode(0)}}
                        >Сохранить</Button>

                        </div>
                    ):(
                        <Button size={'small'} type={'default'} shape={'round'}
                            onClick={handleEditmodeOn}
                        >Редактировать</Button>
                    )}

                </div>
            </div>
        </div>
        <div className={'mi-task-editor-layout'}>

        <div data-color-mode="light" style={{ backgroundColor: "#fff", color: "#000" }}>
            {editMode ? (
                <MDEditor
                    style={{minHeight: 'calc(100vh - 200px)'}}
                    value={content}
                    preview={'edit'}
                    className="markdown-body--light"
                    onChange={handleContentChange}
                    commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.divider,
                    commands.title3,
                    commands.title4,
                    commands.title5,
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
                                    ></MDEditor>
            ):(
                <div className='mi-pa-12'>
            <MDEditor.Markdown source={content} />
                </div>
            )}


        </div>

            <div>
                <TreeTaskEditorSettingsForm />
            </div>

        </div>
    </div>
  );
};

export default TreeTaskEditor;
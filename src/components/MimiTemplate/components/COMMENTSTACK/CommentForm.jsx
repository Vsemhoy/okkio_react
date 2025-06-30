import React, { useEffect, useState } from "react";
import StackComment from "./StackComment";
import './style/stackcomment.css';
import { Avatar, Button, Switch, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import MDEditor, { commands } from "@uiw/react-md-editor";

const CommentForm = (props) => {
    const [text, setText] = useState('');
    const [previewMode, setPreviewMode] = useState(false);

    const [isMarkdown, setIsMarkdown] = useState(false);
    
    const [itemId, setItemId] = useState(null);

    const [blockId, setBlockId] = useState(props.block_id);

    useEffect(()=>{
        setItemId(props.id);
    },[props.id])


    useEffect(()=>{
        setText(props.text);
    },[props.text]);

    useEffect(()=>{
        if (previewMode && props.on_change_text){
            props.on_change_text(text);
        }
    },[previewMode]);

    const handleTextChange = (value) => {
        setText(value);
        if (previewMode && props.on_change_text){
            props.on_change_text(value);
        }
    };

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

    return (
        <div className={'mi-comment-wrapper'}>
        <div className={'mi-comment-body'} id={blockId}>
            <div className={'mi-pa-6'}> 
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

            </div>
            <div className={'mi-flex-space'}>
                <div>
                    <Switch checkedChildren="Markdown" unCheckedChildren="Text" defaultChecked
                        value={isMarkdown}
                        onChange={(val)=>{handleFormatChange(val)}}
                     />
                </div>
                <div className={'mi-pa-6 mi-flex'} style={{gridGap: '12px'}}> 
                    {itemId && (
                        <Button
                            type={previewMode ? 'primary' : 'default'}
                            onClick={()=>{setPreviewMode(!previewMode)}}
                        size="small">Просмотр</Button>
                    )}                   
                    <Button size="small"
                        onClick={handleDiscard}
                    >Отменить</Button>
                    <Button
                        onClick={handleSave}
                    size="small">Сохранить</Button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CommentForm;
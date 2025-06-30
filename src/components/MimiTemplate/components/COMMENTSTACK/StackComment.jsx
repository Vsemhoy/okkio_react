import { CommentOutlined } from "@ant-design/icons";
import React, { useContext, useId, useState } from "react";
import CommentForm from "./CommentForm";
import { StateContext } from "../../../ComStateProvider25/ComStateProvider25";
import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";

const StackComment = (props) => {
    const [level, setLevel] = useState(props.level ? props.level : 1);
    const {editedComment, setEditedCommentId} = useContext(StateContext);

    const [createMode, setCreateMode] = useState(false);

    const [openEditor, setOpenEditor] = useState(false);
    const [openStack, setOpenStack] = useState(false);
    const [countInStack, setCountInStack] = useState(2);
    
    const [itemId, setItemId] = useState(useId());

    const [baseItemText, setBaseItemText] = useState('We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.');
    const [itemText, setItemText] = useState('We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.');

        const [baseIsMarkdown, setBaseIsMarkdown] = useState(false);
        const [isMarkdown, setIsMarkdown] = useState(false);

    const handleOpenEditor = ()=>{
        setCreateMode(false);
        setOpenEditor(!openEditor);
        console.log('editedComment', editedComment)
        setEditedCommentId(itemId);
    }
    const handleOpenEditorNew = ()=>{
        setCreateMode(true);
        setOpenEditor(!openEditor)
        setEditedCommentId(0);
    }
    const handleOpenStack = ()=>{
        setOpenStack(!openStack)
    }

    const handleTextChange = (text)=>{
        setItemText(text);
    }

    const handleDiscardChange = ()=>{
        setItemText(baseItemText);
        setOpenEditor(false);
        setEditedCommentId(0);
        setIsMarkdown(baseIsMarkdown);
    }

    const handleSaveComment = (value) => {
        setItemText(value);
        setBaseItemText(value);
        setOpenEditor(false);
        setEditedCommentId(0);
        setBaseIsMarkdown(isMarkdown);
    }

    const handleChangeFormat = (value) => {
        setIsMarkdown(value);
    }

    return (
        <div className={'mi-stack-comment-wrapper'}>
            <div className={'mi-stack-comment'}>
                <div className={'mi-stack-comment-meta'}>
                    MS
                </div>
                <div>
                    <div className={'mi-stack-comment-meta'}>
                        Han Solo
                        8 hours ago {itemId}
                    </div>
                    <div className="stack-comment-text">
                    {isMarkdown ? (
                        <MDEditor.Markdown
                            className="markdown-body--light"
                        source={itemText} />
                    ) : (
                        <div className="comment-body-light"
                            style={{ whiteSpace: 'pre-line' }}>
                            {itemText}
                        </div>
                    )}
                    </div>
                    <div className="mi-flex-space">
                        <div className={'mi-flex'}>

                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenEditor}
                            >
                                Редактировать
                            </div>
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenEditorNew}
                            >
                                Ответить  
                            </div>
                        </div>
                        <div>
                        {level === 1 && (
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenStack}
                            >
                                <CommentOutlined /> {countInStack} раскрыть
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            {!createMode && openEditor && itemId === editedComment  && (
                <CommentForm 
                    on_change_text={handleTextChange}
                    text={itemText}
                    on_discard={handleDiscardChange}
                    on_save={handleSaveComment}
                    on_change_format={handleChangeFormat}
                />
            )}
            {openStack && level === 1 && (
                <div className={'mi-comment-stack-in'}>
                    <div></div>
                    <div>
                        <StackComment level={level + 1} />
                        <StackComment level={level + 1} />

                    </div>
                </div>
            )}
            {createMode && openEditor  && editedComment === 0 && (
                <CommentForm 

                />
            )}
        </div>
    )
}

export default StackComment;
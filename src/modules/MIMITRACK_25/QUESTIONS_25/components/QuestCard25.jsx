
import React, { useEffect, useId, useState } from "react";

import './style/questcard.css';
import { ApartmentOutlined, CommentOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

import Her from "../../../../Components/HybridEmbeddedRouter/Her";
import CommentStack from "../../../../Components/MimiTemplate/components/COMMENTSTACK/CommentStack";
import CommentForm from "../../../../Components/MimiTemplate/components/COMMENTSTACK/CommentForm";
import { useContext } from "react";
import { StateContext } from "../../../../Components/ComStateProvider25/ComStateProvider25";



const QuestCard25 = (props)=>{
    const {editedCommentParent, setEditedCommentId, setEditedCommentParentId} = useContext(StateContext)
    const [openEditor, setOpenEditor] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [countComments, setCountComments] = useState(2);

    const [blockId, setBlockId] = useState(useId());

    const [openAddComment, setOpenAddComment] = useState(false);
    const [openTasks, setOpenTasks] = useState(false);
    const [countTasks, setCountTasks] = useState(2);

    const [itemId, setItemId] = useState(useId());



    const handleOpenComments = ()=>{
        setOpenComments(!openComments);
    }
    const handleOpenTasks = ()=>{
        setOpenTasks(!openTasks);
    }

    const handleOpenEditor = ()=> {
        if (props.on_open_editor){
            props.on_open_editor(itemId);
        }
    }

    const handleOpenAddComment = ()=> {
        setEditedCommentParentId(itemId);
        setEditedCommentId(0);
        setOpenAddComment(!openAddComment);
    }
    useEffect(()=>{
        if (openAddComment){
            const element = document.getElementById(blockId);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        };
    },[openAddComment])

    useEffect(()=>{
        if (editedCommentParent !== itemId){
            setOpenAddComment(false);
        };
    },[editedCommentParent])

    return (
        <div className={`mi-claim-card-wrapper ${( openTasks) && (countTasks) ? "mi-uncooxed" : "" }`}>
            <div className="mi-claim-card">
                <div className={'mi-pa-6 mi-centered'}>
                    <div className="mi-bagic" style={{marginBottom: '6px'}}>
                        MA
                    </div>
                    
                    {/* <TrackStatusItem item={TrackStatuses[1]} /> */}
                    </div>
                <div>
                    <div className={'mi-flex'}>
                        <div className={'mi-pa-6 mi-card-title'}>
                            Сделать много всякой всячины и так далее
                            Сделать много всякойСделать много всякой всячины и так далее
                            Сделать много всякой
                        </div>
                    </div>

                    <div className={'mi-flex-space'}>
                        <div>
                            
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenEditor}>
                                <EditOutlined /> Редактировать
                            </div>
                           
                        </div>
                        <div>
                            
                        </div>
                        <div className={'mi-flex'}>
  
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenComments}
                            >
                                <CommentOutlined /> 216
                            </div>
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenAddComment}
                                >
                                <PlusCircleOutlined /> Добавить
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        {openComments && (
            <CommentStack />
        )}

        {openAddComment &&  (
            <div className={'mi-comment-stack'}>
            <div></div>
            <div className={'mi-comment-stack-collection'}>
                <CommentForm
                on_discard={()=>{setOpenAddComment(false)}}
                block_id={blockId}
                ></CommentForm>
            </div>
        </div>
        )}

        </div>
    );
}

export default QuestCard25;
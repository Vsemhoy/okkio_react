import React, { useId, useState } from "react";

import './style/taskcard.css';
import { ApartmentOutlined, CommentOutlined, EditOutlined } from "@ant-design/icons";
import CommentStack from "../COMMENTSTACK/CommentStack";
import Her from "../../../HybridEmbeddedRouter/Her";
import TrackStatusItem, { TrackStatuses } from "../../../Definitions/StatusTrackDefinition";
import TaskStack from "../TASKSTACK/TaskStack";
import TaskStatusItem, { TaskStatuses } from "../../../Definitions/StatusTaskDefinition";

const TaskCard25 = (props)=>{
    const [openEditor, setOpenEditor] = useState(false);
    const [openComments, setOpenComments] = useState(false);
    const [countComments, setCountComments] = useState(2);

    const [openTasks, setOpenTasks] = useState(false);
    const [countTasks, setCountTasks] = useState(2);

    const [itemId, setItemId] = useState(useId());

    const handleOpenComments = ()=>{
        setOpenComments(!openComments);
    }
        const handleOpenTasks = ()=>{
        setOpenTasks(!openTasks);
    }

    return (
        <div className={`mi-task-card-wrapper ${(openTasks) && (countTasks) ? "mi-uncooxed" : "" }`}>
            <div className="mi-task-card">
                <div className={'mi-pa-6 mi-centered'}>
                    <div className="mi-bagic" style={{marginBottom: '6px'}}>
                        MA
                    </div>
                    
                    <TaskStatusItem item={TaskStatuses[1]} />
                    </div>
                <div>
                    <div className={''}>
                        <div className={'mi-pa-6 mi-card-title'}>
                            Сделать много всякой всячины и так далее
                        </div>

                        <div className={'mi-pa-6 mi-card-text'}>
                            Сделать много всякой всячины и так далее
                            Сделать много всякой всячины и так далее
                            Сделать много всякой всячины и так далее
                            Сделать много всякой всячины и так далее
                        </div>
                    </div>

                    <div className={'mi-flex-space'}>
                        <div>
                            <Her href={'tasks/editor/' + itemId + '&task=' + itemId} >
                            <div className={'mi-card-meta-info'}>
                                <EditOutlined /> Редактировать
                            </div>
                            </Her>
                        </div>
                        <div>
                            
                        </div>
                        <div className={'mi-flex'}>
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenTasks}
                            >
                                <ApartmentOutlined /> 12
                            </div>
                            <div className={'mi-card-meta-info'}
                                onClick={handleOpenComments}
                            >
                                <CommentOutlined /> 216
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        {openComments && (
            <CommentStack />
        )}

        {openTasks && (
            <TaskStack />
        )}

        </div>
    );
}

export default TaskCard25;
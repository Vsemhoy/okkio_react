import React, { useId, useState } from "react";

import './style/claimcard.css';
import { ApartmentOutlined, CommentOutlined, EditOutlined } from "@ant-design/icons";
import CommentStack from "../COMMENTSTACK/CommentStack";
import Her from "../../../HybridEmbeddedRouter/Her";
import TrackStatusItem, { TrackStatuses } from "../../../Definitions/StatusTrackDefinition";
import TaskStack from "../TASKSTACK/TaskStack";

const ClaimCard25 = (props)=>{
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
        <div className={`mi-claim-card-wrapper ${( openTasks) && (countTasks) ? "mi-uncooxed" : "" }`}>
            <div className="mi-claim-card">
                <div className={'mi-pa-6 mi-centered'}>
                    <div className="mi-bagic" style={{marginBottom: '6px'}}>
                        MA
                    </div>
                    
                    <TrackStatusItem item={TrackStatuses[1]} />
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
                            <Her href={'claims/editor/' + itemId + '&claim=' + itemId} >
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

export default ClaimCard25;
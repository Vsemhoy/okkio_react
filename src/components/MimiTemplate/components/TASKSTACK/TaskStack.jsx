import React from "react";

import './style/stackctask.css';
import { Avatar, Button, Tooltip } from "antd";
import TaskCard25 from "../TASKCARD/TaskCard25";

const TaskStack = ({label, children}) => {

    return (
        <div className={'mi-task-stack'}>
            <div></div>
            <div className={'mi-task-stack-collection'}>

                <TaskCard25 />

            </div>
        </div>
    )
}

export default TaskStack;
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, CodeOutlined, LoadingOutlined, PauseCircleOutlined, QuestionCircleOutlined, RollbackOutlined, SendOutlined } from "@ant-design/icons";
import React from "react";

export const TaskStatuses = [

    {
        id: 1,
        title:'ожидает',
        text: 'Заявка в очереди на выполнение',
        icon: <ClockCircleOutlined style={{color: '#ffbe00'}} />,
        color: '#988989',
    },
    {
        id: 2,
        title:'в работе',
        text: 'Ведутся работы над задачей',
        icon: <CodeOutlined style={{color: '#ff8f1e'}} />,
        color: '#988989',
    },
    {
        id: 3,
        title:'тестирование',
        text: 'Результаты на стадии тестирования',
        icon: <QuestionCircleOutlined style={{color: '#958fe0'}} />,
        color: '#988989',
    },
    {
        id: 4,
        title:'выполнено',
        text: 'Заявка исполнена',
        icon: <CheckCircleOutlined style={{color: '#2ecc71'}} />,
        color: '#988989',
    },
    {
        id: 5,
        title:'не актуально',
        text: 'Заявка отозвана за неактуальностью',
        icon: <RollbackOutlined style={{color: '#a470ff'}} />,
        color: '#988989',
    },
    {
        id: 6,
        title:'отклонено',
        text: 'Заявка отклонена',
        icon: <CloseCircleOutlined style={{color: '#c9a294'}} />,
        color: '#988989',
    },
]

const TaskStatusItem = ( {item} ) => {
    return (
        <div className="mi-state-badge"
        style={{ color: item.color }}
        title={item.text}
        >
            {item.icon}
        </div>
    );
};

export default TaskStatusItem;
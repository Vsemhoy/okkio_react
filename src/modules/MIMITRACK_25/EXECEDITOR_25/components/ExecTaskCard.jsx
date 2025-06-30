import { BarsOutlined, BorderOutlined, CaretRightOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../../Components/ComStateProvider25/ComStateProvider25';


    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red';
            case 'medium': return 'orange';
            case 'low': return 'green';
            default: return 'gray';
        }
    };


    const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Создать копию
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Удалить
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Заблокировать (скрыть)
      </a>
    ),
  },
];

const ExecTaskCard = (props) => {
    const { activeTask, setActiveTaskItem } = useContext(StateContext);

    const [task, setTask] = useState(props.task);

    const [draggedItem, setDraggedItem] = useState(null);

    const [runState, setRunState] = useState(false);


    useEffect(() => {
      setDraggedItem(props.dragged_item);
    }, [props.dragged_item]);

    useEffect(() => {
      setTask(props.task);
    }, [props.task]);


  const handleOpenTaskEditor = (id) => {
    if (props.on_call_editor){
        props.on_call_editor(id);
    }
    // setEditedTask(id);
    // setOpenTaskEditor(true);
    // console.log('id', id);
  }

    const handleDragStart = (e, task) => {
        if (props.on_drag_start)
        {
            props.on_drag_start(e, task);
        }
  }

  const handleDragEnd = (ev) => {
    if (props.on_drag_end)
    {
        props.on_drag_end(ev);
    }
  }

  const handleTaskStart = () => {
    setActiveTaskItem(task);
    setRunState(true);
  }
    const handleTaskEnd = () => {
    setRunState(false)
    setActiveTaskItem(null);
  }

  return (
    <div
        onDoubleClick={()=>{handleOpenTaskEditor(task.id)}}
        key={task.id}
        className={'sort-item mi-exectask'}
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
        onDragEnd={handleDragEnd}
        style={{
            borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
            opacity: draggedItem?.id === task.id ? 0.5 : 1
        }}
    >
        <div className='mi-exectask-head mi-flex-space'>
            <div>#{task.id}</div>
            <Dropdown menu={{ items: items }} placement="bottomRight">
            <div className='mi-sort-head-trig'><BarsOutlined /></div>
            </Dropdown>
        </div>
        <div className='mi-exectask-content'>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
        <div className={'mi-exectask-footer mi-flex-space'}>
            <div>Helll</div>
            <div>
            {!runState ? (
                <div className={'mi-exectask-span-trigger runner'}
                    onClick={handleTaskStart}
                >
                    <CaretRightOutlined />
                </div>
            ) : (
                <div className={'mi-exectask-span-trigger stopper'}
                    onClick={handleTaskEnd}
                >
                    <BorderOutlined />
                </div>
            )}
            </div>
        </div>

    </div>
  );
};

export default ExecTaskCard;
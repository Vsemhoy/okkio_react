import { BarsOutlined, DeleteOutlined, DownCircleOutlined, DownSquareOutlined, EnterOutlined, PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import InputContentEditable from '../../../../../../Components/MimiTemplate/components/CONTENTEDITABLE/InputContentEditable';


const menuItems = [
{
    key: '5',
    label: (
      <div>
        Удалить
      </div>
    ),
    icon: <DeleteOutlined />,
    danger: true
  },
    {
    key: '4',
    label: (
      <div>
        Добавить секцию
      </div>
    ),
    icon: <PlusSquareOutlined />
  },
  {
    key: '1',
    label: (
      <div>
        Добавить подсекцию
      </div>
    ),
    icon: <DownSquareOutlined />
  },
  {
    key: '2',
    label: (
      <div>
        Добавить задачу
      </div>
    ),
    icon: <PlusCircleOutlined />
  },
  {
    key: '3',
    label: (
      <div>
        Добавить подзадачу
      </div>
    ),
    icon: <DownCircleOutlined />
  },
];

const TaskListRowCard = (props) => {

    const [item, setItem] = useState(props.data);
    const [level, setLevel] = useState(props.level ? props.level : 0);

    const [itemTitle, setItemTitle] = useState(props.data?.title);

    const changeTitleText = (value) => {
        // console.log('ev', ev)
        setItemTitle(value);
    }

  return (
    <div className={`mi-flat-task-wrapper mi-level-${level}`}>
        <div className={`mi-flat-task  ${item.type === 'section' ? 'mi-ft-section-item' : ''}`}>
            <div className={'mi-flat-task-root'}>
                {item.type === 'section' ? '📁' : '📄'}
            </div>
            <div className={'mi-flat-task-body'}>
                <div className={'mi-flat-task-first-stage'}>
                    <div className={'mi-flat-task-content'}>
        
                        <InputContentEditable
                            value={itemTitle}
                            onChange={changeTitleText}
                            />
                    </div>
                </div>
                <div className={'mi-flat-task-second-stage mi-flex-space'}>
                    <div>
                        
                    </div>
                     <div className={'mi-flat-task-options'}>
                        <div className={'mi-flat-task-control-box'}>
                            <Dropdown menu={{ items:  menuItems }} placement="topRight" arrow>
                                <Button
                                    type={'text'}
                                    size={'small'}><BarsOutlined /></Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>

            
           
        </div>
        {item?.children?.length > 0 && (
            <div className={'mi-flat-task-childrens'}>
                {item.children.map((subItem)=>(
                    <TaskListRowCard data={subItem} level={level + 1} />
                ))}
            </div>
        )}
    </div>
  );
};

export default TaskListRowCard;
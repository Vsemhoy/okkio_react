import React, { useState } from 'react';
import { Button, Dropdown, Tree } from 'antd';
import './components/style/tasklist25.css';
import { AccountBookOutlined, CloseOutlined, CloseSquareOutlined, CodepenSquareFilled, EllipsisOutlined, EnterOutlined, FileOutlined, FolderOutlined, MinusOutlined, UserOutlined } from '@ant-design/icons';
import TaskListRowCard from './components/style/TaskListRowCard';


// const x = 3;
// const y = 2;
// const z = 1;
// const defaultData = [];
// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || defaultData;
//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);


const treeData = [
  {
    title: 'Это папка - секция',
    key: '0-0',
    id: '0-0',
    type: 'section',
    children: [
      {
        title: 'Это вложенная секция',
        key: '0-0-0',
        id: '0-0-0',
        type: 'section',
        children: [
          { title: '0-0-0-0', 
            key: '0-0-0-0',
            id: '0-0-0-0',
            type: 'document' },
          { title: '0-0-0-1', 
            key: '0-0-0-1',
            id: '0-0-0-1',
            type: 'document' },
          { title: '0-0-0-2', 
            key: '0-0-0-2',
            id: '0-0-0-2',
            type: 'document' },
        ],
      },
      {
        title: 'Ещё одна вложенная секция',
        key: '0-0-1',
        id: '0-0-1',
        type: 'section',
        children: [
          { title: '0-0-1-0',
            key: '0-0-1-0',  
            id: '0-0-1-0',  
            type: 'document' },
          { title: '0-0-1-1',
            key: '0-0-1-1',  
            id: '0-0-1-1',  
            type: 'document' },
          { title: '0-0-1-2',
            key: '0-0-1-2',  
            id: '0-0-1-2',  
            type: 'document' },
        ],
      },
      {
        title: 'А это задача в секции',
        key: '0-0-2',
        id: '0-0-2',
        type: 'document',
        children: [
              {
                    title: '0-2',
                    key: '0-2',
                    id: '0-2',
                    type: 'document',
                },
                    {
                    title: '0-2',
                    key: '0-36',
                    id: '0-36',
                    type: 'document',
                },
        ]
      },
    ],
  },
  {
    title: 'Это вторая секция',
    key: '0-1',
    id: '0-1',
    type: 'section',
    children: [
      { title: 'Ещё одна задача', 
        key: '0-1-0-0',  
        id: '0-1-0-0',  
        type: 'document'},
      { title: '0-1-0-1', 
        key: '0-1-0-1',  
        id: '0-1-0-1',  
        type: 'document' },
      { title: '0-1-0-2', 
        key: '0-1-0-2',  
        id: '0-1-0-2',  
        type: 'document' },
    ],
  },

];



const items = [
  {
    label: <div className={'mi-flex-space'}><span>Helllo wolfira</span> <span className='mi-wintab-closer'><CloseOutlined ></CloseOutlined></span></div>,
    key: '1',
    icon: <span><FileOutlined /></span>,
  },
  {
    label: <div className={'mi-flex-space'}><span>Super section Heere</span> <span className='mi-wintab-closer'><CloseOutlined ></CloseOutlined></span></div>,
    key: '2',
    icon: <span><FolderOutlined /></span>,
  },
  {
    label: <div className={'mi-flex-space'}><span>Jsdfjadf asdkfja dfasjdfjklasjdf a aJJJ fjaskldjf  wolfira</span> <span className='mi-wintab-closer'><CloseOutlined ></CloseOutlined></span></div>,
    key: '3',
    icon: <span><FileOutlined /></span>,
    danger: true,
  },
  {
label: <div className={'mi-flex-space'}><span>CLEAR TABS</span> <span className='mi-wintab-closer'><CloseOutlined ></CloseOutlined></span></div>,
    key: '4',
    icon: <span><CloseSquareOutlined /></span>,
    // disabled: true,
  },
];
const menuProps = {
  items,
  onClick: console.log,
};

 

const TaskListPage25 = (props) => {

 const [gData, setGData] = useState(treeData);
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null);


    function getLevel(node, key, level = 0) {
        if (!node) return 0;
        if (node.key === key) return level;
        if (node.children) {
            for (let child of node.children) {
            let childLevel = getLevel(child, key, level + 1);
            if (childLevel) return childLevel;
            }
        }
        return 0;
    }

    const getMaxDepth = (node) => {
        if (!node.children || node.children.length === 0) {
            return 1; // листовой узел — глубина 1
        }
        const childrenDepths = node.children.map(child => getMaxDepth(child));
        return 1 + Math.max(...childrenDepths);
    };

    const findNodeByKey = (nodes, key) => {
        for (let node of nodes) {
            if (node.key === key) {
            return node;
            }
            if (node.children) {
            const found = findNodeByKey(node.children, key);
            if (found) return found;
            }
        }
        return null;
    };

  const onDragEnter = info => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };
  const onDrop = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');

    const dropNode = info.node;
    const dragNode = info.dragNode;

    // Найти уровень dropNode
      const dropLevel = getLevel({ children: gData }, dropKey);

    // Получаем максимальную глубину переносимого узла
    const dragNodeData = findNodeByKey(gData, dragKey);
    const maxDepthDragNode = getMaxDepth(dragNodeData);

    // Итоговая глубина после вставки
    const finalDepth = dropLevel + maxDepthDragNode;

    // Проверить ограничения
 // Проверяем ограничения
  if (dragNode.type === 'section') {
    if (dropNode.type !== 'section' || finalDepth > 3) {
      alert('Секции можно вкладывать только в секции до 3-го уровня');
      return;
    }
  }
  if (dragNode.type === 'document') {
    if (finalDepth > 7) {
      alert('Документы нельзя вкладывать глубже 7-го уровня');
      return;
    }
  }


    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i, 0, dragObj);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };

    const onSelect = (selectedKeys, info) => {
    console.log('Выбранные ключи:', selectedKeys); // массив выбранных ключей
    console.log('Информация о событии:', info);
    // selectedKeys — массив, обычно с одним элементом, если single select
    const key = selectedKeys[0];
    if (selectedKeys.length){
        setSelectedKeys(selectedKeys);
    }
    // здесь можно добавить key в твой массив или обработать
    };

    const onDoubleClick = (node) => {
        console.log('node. ID ', node)
        if (node.key){
            setSelectedKeys([node.key]);
            setCurrentItemId(node.id);
        }
    }


  return (
    <div className={'mi-page-wrapper'}>
        <div className={"mi-ska-mw-1900"}>
                
                <div className={"mi-taskbody mi-1col-3col"}>


                    <div className={'mi-window'}>
                        <div className={'mi-window-control'}>
                            <div className={'mi-window-control-title'}>
                                Project name
                            </div>
                            <div className='mi-flex'>
                                <div className={'mi-window-control-button'}>
                                    <MinusOutlined />
                                </div>
                                <div className={'mi-window-control-button'}>
                                    <CloseOutlined />
                                </div>
                            </div>
                        </div>
                        <div className={'mi-window-body'}>
                        {/* <div className={'mi-pa-12 mi-flex-gap'}>
                            <Button solid danger size={'small'}>Add section</Button>
                            <Button solid  size={'small'}>Add task</Button>
                        </div> */}
                        <div style={{padding: '9px'}}>
                            {/* <Tree
                                className="draggable-tree"
                                defaultExpandedKeys={expandedKeys}
                                draggable
                                blockNode
                                onDragEnter={onDragEnter}
                                onDrop={onDrop}
                                treeData={gData}
                                /> */}

                            <div className={'mi-tree-header-name'}>
                                <span>🗂️ </span>
                                <span>Название проекта, может быть сколь угодно длинное...</span>
                                
                            </div>  

                            <Tree
                                className="draggable-tree"
                                defaultExpandedKeys={expandedKeys}
                                draggable
                                blockNode
                                selectedKeys={selectedKeys}
                                onDragEnter={onDragEnter}
                                onDrop={onDrop}
                                treeData={gData}
                                onSelect={onSelect}
                                titleRender={nodeData => (
                                    <span className={`${nodeData.id === currentItemId ? "mi-cura-selected" : ""}`}>
                                    {nodeData.type === 'section' ? '📁' : '📄'} {nodeData.title}
                                    </span>
                                )}
                                onDoubleClick={(ev, node)=>{onDoubleClick(node)}}
                                />   
                            
                        </div>

                        </div>
                    </div>



                    <div className={'mi-window'}>
                        <div className={'mi-window-control'}>
                            <div  className={'mi-window-topbar-tabs mi-flex'}>
                                <div className={'mi-window-topbar-tab '}>
                                <span>Tree</span>
                                <span className={'mi-wintab-closer'}>
                                    <span>
                                        <CloseOutlined />
                                    </span>
                                </span>
                                    
                                </div>
                                <div className={'mi-window-topbar-tab active'}>
                                    <span>Задача охереть какая и вообще...</span>
                                    <span className={'mi-wintab-closer'}>
                                        <span>
                                            <CloseOutlined />
                                        </span>
                                    </span>
                                </div>
                                <Dropdown 
                                    menu={menuProps} placement="bottom" icon={<UserOutlined />}
                                >
                                    <div className={'mi-window-topbar-tab'}>
                                        <EllipsisOutlined />
                                    </div>
                                </Dropdown>
                            </div>
                            <div className='mi-flex'>
                                <div className={'mi-window-control-button'}>
                                    <MinusOutlined />
                                </div>
                                <div className={'mi-window-control-button'}>
                                    <CloseOutlined />
                                </div>
                            </div>
                        </div>
                        <div className={'mi-window-body'}>
                            <div className={'mi-pa-12'}>
                                <Button solid color={'default'} size={'small'}>
                                    Показать завершенные
                                </Button>
                            </div>
                            <div>
                                <div className='mi-flat-task-stack-combo'>

                                    {treeData.map((item)=>(
                                        <TaskListRowCard data={item} />
                                    ))}

        

                                </div>

                            </div>
                        </div>
                    </div>



                </div>
                <br/>


        </div>
    </div>
  );
};

export default TaskListPage25;
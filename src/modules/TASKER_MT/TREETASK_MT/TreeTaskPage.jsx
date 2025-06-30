import React, { useEffect, useState } from 'react';
import DevSideNavMt from '../../../components/MimiTemplate/components/DEVSIDENAV/DevSidenavMt';
import { Button, Dropdown, Tree } from 'antd';
import './components/style/treetaskpage.css';
import { AccountBookOutlined, CloseOutlined, CloseSquareOutlined, CodepenSquareFilled, EllipsisOutlined, EnterOutlined, FileOutlined, FolderOutlined, MergeOutlined, MinusOutlined, PushpinFilled, UserOutlined } from '@ant-design/icons';
import TreeTaskRowCard from './components/TreeTaskRowCard';
import TreeTaskEditor from './components/TreeTaskEditor';

import { useSelector, useDispatch } from 'react-redux';
import { loadTree, addTreeNode, updateTreeNode, addTabbedNode, setActiveDocument, fetchProjectTree } from '../../../storage/tasksSlice';
import { generateShortId } from '../../../utils/Text/Generators';

const generateRandomKey = () => Math.random().toString(36).substr(2, 9);

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
    key: 'clearshadow',
    id: 'clearshadow',
    icon: <span><CloseSquareOutlined /></span>,
    // disabled: true,
  },
];
const menuProps = {
  items,
  onClick: console.log,
};




  // const getProjectTreeFromStoreOrAPI = async (projectId) => {
  //   const cachedTree = useSelector(state => state.tasks.projects[projectId]?.tree);
  //   if (cachedTree && cachedTree.length > 0) return cachedTree;

  //   // Загружаем с сервера
  //   const res = await fetch(`/api/tree?projectId=${projectId}`);
  //   const data = await res.json();
  //   return data.tree;
  // };



const TreeTaskPage = ({user_data, user_state}) => {
  const dispatch = useDispatch();
  const activeProject = useSelector(state => state.ui.currentProject);
  const treeData = useSelector(state => state.tasks.projects[activeProject.id]?.tree || []);
  const tabbedNodes = useSelector(state => state.tasks.projects[activeProject.id]?.tabbedNodes || {});
  const activeDocument = useSelector(state => state.tasks.projects[activeProject.id]?.activeDocument || {});

  const baseProjects = useSelector(state => state.projects.list);
  const cachedTree = useSelector(state => state.tasks.projects[activeProject.id]?.tree || null);



    const [baseNodeCollection, setBaseNodeCollection] = useState(treeData);
    const [nodeCollection, setNodeCollection] = useState(treeData);

    console.log('nodeCollection', treeData)

  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [activeNode, setActiveNode] = useState('root');
  const [selectedNode, setSelectedNode] = useState(null);

    const [viewportMode, setViewportMode] = useState('tree');

    const [shadowOpenedItems, setshadowOpenedItems] = useState([]);

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





  useEffect(() => {
    if (activeProject.id) {
      dispatch(fetchProjectTree(activeProject.id));
    }
  }, [activeProject.id]);


    useEffect(() => {
      if (selectedKeys[0] !== 'root'){
        setSelectedNode(findNodeByKey(baseNodeCollection, selectedKeys[0]));
      }
    }, [selectedKeys]);

  useEffect(() => {
    if (activeNode==='root'){
        setSelectedKeys(['root']);
        setNodeCollection(baseNodeCollection);
    } else {
        // let a = findNodeByKey(baseNodeCollection, activeNode);
        // console.log('a', a)
         setNodeCollection([findNodeByKey(baseNodeCollection, activeNode)]);
    }
  }, [baseNodeCollection, activeNode]);




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
      const dropLevel = getLevel({ children: baseNodeCollection }, dropKey);

    // Получаем максимальную глубину переносимого узла
    const dragNodeData = findNodeByKey(baseNodeCollection, dragKey);
    const maxDepthDragNode = getMaxDepth(dragNodeData);

    // Итоговая глубина после вставки
    const finalDepth = dropLevel + maxDepthDragNode;

    // Проверить ограничения
 // Проверяем ограничения
  if (dragNode.type === 'section') {
    if (dropNode.type !== 'section' || finalDepth > 4) {
      alert('Секции можно вкладывать только в секции до третьего уровня');
      return;
    }
  }
  if (dragNode.type === 'document') {
    if (finalDepth > 7) {
      alert('Документы нельзя вкладывать глубже седьмого уровня');
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
    const data = [...baseNodeCollection];
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
    setBaseNodeCollection(data);
  };

    const onSelect = (selectedKeys, info) => {
        setActiveNode(selectedKeys[0]);
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
      console.log('DBL', node)
      if (viewportMode !== 'editor'){
        setViewportMode('editor');
        console.log('node. ID ', node)
        if (node.key){
            setSelectedKeys([node.key]);
            setCurrentItemId(node.id);
        }
      } else {
        let shadowItems = JSON.parse(JSON.stringify(shadowOpenedItems));
        let newItems = [];

        let item = findNodeByKey(baseNodeCollection, node.id);
        

        console.log('item', item, baseNodeCollection)
        if (item){
          newItems.push({
            key: `shade_${item.id}`,
            id: item.id, 
            type: item.type,
            label: <div className={'mi-flex-space mi-truncated'} >{item.title}</div>,
            icon: node.type === 'section' ? <FolderOutlined  title={item.title}/> : <FileOutlined  title={item.title}/>
          });

          for (let i = 0; i < shadowItems.length; i++) {
            const element = shadowItems[i];
            
            if (element.id !== 'clearshadow' && element.id !== node.id){
              let item2 = findNodeByKey(baseNodeCollection, element.id);
              newItems.push({
              key: `shade_${element.id}`,
              id: element.id, 
              label: <div className={'mi-flex-space mi-truncated'}>{item2?.title}</div>,
              icon: element.type === 'section' ? <FolderOutlined  title={item2.title} /> : <FileOutlined  title={item2.title}/>
          })
            }
          }
          console.log('newItems', newItems)
          if (newItems.length){
            newItems.push( {
              label: <div className={'mi-flex-space'}><span>CLEAR TABS</span> </div>,
              key: 'clearshadow',
              id: 'clearshadow',
              icon: <span><CloseSquareOutlined /></span>,
              danger: true
              // disabled: true,
            });
          }

        }
        setshadowOpenedItems(newItems);
      }
    }

    const handleClickShadeTab = (itm) => {
      // console.log('first', id)
      let id = itm.key.replace('shade_', '');
      if (id === 'clearshadow'){
        setshadowOpenedItems([]);
      } else {
        setActiveNode(id);
        setSelectedKeys([id]);
        // let ns = JSON.parse(JSON.stringify(shadowOpenedItems)).filter((item) => item.id !== id);
        // console.log('ns', ns)
        // setshadowOpenedItems(ns);
      }
    }

    const handleRemoveFromShadeTab = (id) => {
      // console.log('first', id)
        const updatedItems = [...shadowOpenedItems].filter(item => item.id !== id);
      // Если остался 1 элемент — очищаем полностью
      setshadowOpenedItems(updatedItems.length === 1 ? [] : updatedItems);
    }

    const handleAddToShadeTab = (id) => {
      console.log('id', id)
      let ns = findNodeByKey(baseNodeCollection, id);
      console.log('ns', ns)
      if (ns){
        let obj = {
              key: `shade_${ns.id}`,
              id: ns.id, 
              label: <div className={'mi-flex-space mi-truncated'}>{ns?.title}</div>,
              icon: ns.type === 'section' ? <FolderOutlined title={ns?.title} /> : <FileOutlined title={ns?.title} />
          };
          if (shadowOpenedItems.length === 0){
            setshadowOpenedItems([obj,{
              label: <div className={'mi-flex-space'}><span>CLEAR TABS</span> </div>,
              key: 'clearshadow',
              id: 'clearshadow',
              icon: <span><CloseSquareOutlined /></span>,
              danger: true
              // disabled: true,
            }]);

          } else {
            setshadowOpenedItems([obj, ...shadowOpenedItems]);
          }
      }
      
    }

    const updateNodeTitle = (nodes, keyToUpdate, newTitle) => {
    return nodes.map(node => {
        if (node.key === keyToUpdate) {
        // Создаем новый объект узла с обновленным заголовком
        return { ...node, title: newTitle };
        }

        // Если есть дети — рекурсивно обновляем их
        if (node.children) {
        return {
            ...node,
            children: updateNodeTitle(node.children, keyToUpdate, newTitle),
        };
        }

        return node;
    });
    };

    const handleChangeTaskTitle = (id, title) => {
      const updatedTree = updateNodeTitle(baseNodeCollection, id, title);
      setBaseNodeCollection(updatedTree); // Обновляем состояние реакта

      setshadowOpenedItems(shadowOpenedItems.map(node => {
        if (node.id === id){
          return  {...node, label: title}
        };
        return node;
      }));

      if (selectedNode.id === id){
        setSelectedNode({
          id: id, 
          title: title
        });
      }
    };


const insertNodeInTree = (tree, parentId, type, newNode, position = 'child') => {
  // Вспомогательная рекурсивная функция для поиска и вставки
  const findAndInsert = (nodes, parentId, parentArray = null, indexInParent = -1) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.key === parentId) {
        if (position === 'child' && node.children !== undefined) {
          // Вставляем как дочерний
          return [
            ...nodes.slice(0, i),
            {
              ...node,
              children: [newNode, ...node.children]
            },
            ...nodes.slice(i + 1)
          ];
        }

        if (position === 'after') {
          // Вставляем после найденного элемента
          return [
            ...nodes.slice(0, i + 1),
            newNode,
            ...nodes.slice(i + 1)
          ];
        }
      }

      // Если дети есть — идём глубже
      if (node.children) {
        const result = findAndInsert(node.children, parentId, node.children, i);
        if (result) {
          return [
            ...nodes.slice(0, i),
            { ...node, children: result },
            ...nodes.slice(i + 1)
          ];
        }
      }
    }

    return null;
  };

  const updatedTree = findAndInsert(tree, parentId);
  return updatedTree || tree;
};


const makeNewNode = (type, title, parentId = null, sort_order = 0) => {
  return {
    key: `${type}_${generateShortId()}`,
    t: type,
    title: title || (type === 's' ? 'Новая секция' : 'Новая задача'),
    so: sort_order // Автоматический sort_order для корня
  };
};

const handleAddSection = (where, target_id) => {
  const newNode = makeNewNode('s', `Новая секция ${where}`, treeData.length + 1);

  dispatch(addTreeNode({
    projectId: activeProject.id,
    parentId: target_id || null, // null → корень
    newNode
  }));
};

    // const makeNewNode = (nodeType, where, target_id, sort_order = 0)=>{
    //     const nkey = nodeType + '_new_' + generateShortId(19);
    //     const newNode = {
    //         title: nodeType === 's' ? 'Новая секция ' + nkey : 'Новый документ'  + nkey,
    //         key: nkey,
    //         // id: nkey, // можно использовать то же значение, что и key
    //         t: nodeType,
    //         // children: [],
    //         so: where === 'after' ? 1 : 0,
    //         childrens: []
    //     };
    //     return newNode;
    // }

    // const handleAddSection = (where, target_id) => {
    //     console.log('where', where); // can be 'below' or 'child'

    //     if (target_id){
    //       let newNode =  makeNewNode('s', where, target_id);
    //       dispatch(updateTreeNode({
    //         projectId: activeProject.id,
    //         key: target_id,
    //         changes: {
    //           childrens: [...findNodeByKey(treeData, target_id).childrens, makeNewNode('s', where, target_id)]
    //         }
    //       }));
    //     } else {
    //       let newNode =  makeNewNode('s', where, target_id, treeData.length + 1);
    //       console.log('a', newNode)
    //       dispatch(updateTreeNode({
    //         projectId: activeProject.id,
    //           key: target_id,
    //           changes: {
    //             childrens: [...treeData, newNode],
    //           }
    //         }));
    //     }
    //   }

        // if (target_id){
        //   const updatedTree = insertNodeInTree(baseNodeCollection, target_id, 's', makeNewNode('s', where, target_id), where);
        //   setBaseNodeCollection(updatedTree);
        // } else {
        //   setBaseNodeCollection([...baseNodeCollection, makeNewNode('section')]);
        // }




    const handleAddTask = (where, target_id) => {
        const updatedTree = insertNodeInTree(baseNodeCollection, target_id, 'document', makeNewNode('document'), where);
        setBaseNodeCollection(updatedTree);
    }



    const collectAllNodeIds = (node) => {
    const ids = [node.id];

    if (node.children) {
        node.children.forEach(child => {
        ids.push(...collectAllNodeIds(child));
        });
    }

    return ids;
    };

    const removeNodeFromTree = (tree, nodeId) => {
    const findAndRemove = (nodes, nodeId) => {
        for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.key === nodeId) {
            // Удаляем текущий узел
            return [...nodes.slice(0, i), ...nodes.slice(i + 1)];
        }

        if (node.children) {
            const updatedChildren = findAndRemove(node.children, nodeId);
            if (updatedChildren !== node.children) {
            return [
                ...nodes.slice(0, i),
                { ...node, children: updatedChildren },
                ...nodes.slice(i + 1)
            ];
            }
        }
        }
        return nodes;
    };

    return findAndRemove(tree, nodeId);
    };


    const handleDeleteNode = (nodeId, onConfirmDelete) => {
        console.log('nodeId', nodeId)
    const findNodeById = (nodes, id) => {
        for (let node of nodes) {
        if (node.key === id) return node;
        if (node.children) {
            const found = findNodeById(node.children, id);
            if (found) return found;
        }
        }
        return null;
    };

    const nodeToDelete = findNodeById(baseNodeCollection, nodeId);

    if (!nodeToDelete) {
        console.warn('Узел не найден');
        return;
    }

    const allIdsToDelete = collectAllNodeIds(nodeToDelete);

    if (nodeToDelete.children && nodeToDelete.children.length > 0) {
        // Есть дети → спрашиваем подтверждение
        const confirmDelete = window.confirm(
        'Вы уверены, что хотите удалить этот элемент и все вложенные?'
        );

        if (!confirmDelete) return;
    }

    // Удаляем из дерева
    const updatedTree = removeNodeFromTree(baseNodeCollection, nodeId);
    setBaseNodeCollection(updatedTree);

    // Передаём ID в API
    onConfirmDelete(allIdsToDelete);
    };





    const handleEnterEditor = (item_id) => {
        setViewportMode('editor');
        setCurrentItemId(item_id);
        let nnode = findNodeByKey(baseNodeCollection, item_id);
        if (nnode){

          setSelectedNode(nnode);
        }
    }



  return (
    <div className={`mi-page-layout ${user_state?.role == 'developer' ? 'mi-layout-dev' : 'mi-layout-client'}`}>
        {user_state?.role == 'developer' && (
            <DevSideNavMt />
        )}
        <div className={'mi-layout-body'}><div className={'mi-page-wrapper'}>
        <div className={"mi-ska-mw-1900"}>
                
                <div className={"mi-taskbody mi-1col-3col"}>


                    <div className={'mi-window'}>
                        <div className={'mi-window-control'}>
                            <div className={'mi-window-control-title'}>
                                Project tree
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
                                treeData={baseNodeCollection}
                                /> */}

                            <div className={`mi-tree-header-name ${activeNode === 'root' ? 'active' : ''}`} onClick={()=>{setActiveNode('root'); setViewportMode('tree')}}>
                                <span>🗂️ </span>
                                <span>{activeProject ? activeProject.name : 'проект не выбран'}</span>
                                
                            </div>  

                            <Tree
                                className="draggable-tree"
                                defaultExpandedKeys={expandedKeys}
                                draggable
                                blockNode
                                selectedKeys={selectedKeys}
                                onDragEnter={onDragEnter}
                                onDrop={onDrop}
                                treeData={treeData}
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
                                <div className={`mi-window-topbar-tab ${viewportMode === 'tree' ? 'active' : ''}`} 
                                    onClick={()=>{setViewportMode('tree')}}
                                >
                                <span style={{marginRight: '6px'}}>
                                <MergeOutlined />
                                </span> 
                                <span>Local tree</span>
                                {/* <span className={'mi-wintab-closer'}>
                                    <span>
                                        <CloseOutlined />
                                    </span>
                                </span> */}
                                    



                                </div>
                                {selectedNode !== null && (
                                  <div className={`mi-window-topbar-tab ${viewportMode === 'editor' ? 'active' : ''}`} 
                                    onClick={()=>{setViewportMode('editor')}}>
                                    <span
                                      style={{minWidth: '100px'}}
                                     className='mi-truncated'>{selectedNode?.type === 'section' ? <FolderOutlined /> : <FileOutlined />} 
                                    <span style={{marginLeft: '12px'}}>{selectedNode?.title}</span></span>
                                    <span className={'mi-wintab-closer'}>
                                      {shadowOpenedItems.length > 0 && shadowOpenedItems.find((shi)=>shi.id === selectedNode?.id) != null ? (
                                        <span 
                                        onClick={()=>{handleRemoveFromShadeTab(selectedNode?.id)}}
                                         title='удалить из стека'>
                                            <CloseOutlined />
                                        </span>
                                      ) : (
                                        <span
                                          onClick={()=>{handleAddToShadeTab(selectedNode?.id)}}
                                         title='удалить из стека'>
                                            <PushpinFilled />
                                        </span>
                                      )}

                                    </span>
                                </div>
                                )}
                                
                                {shadowOpenedItems.length > 0 && (
                                  <Dropdown 
                                      menu={{items: shadowOpenedItems, onClick: handleClickShadeTab}} placement="bottom" 
                                      icon={<UserOutlined />}
                                  >
                                      <div className={'mi-window-topbar-tab'}>
                                          <EllipsisOutlined />
                                      </div>
                                  </Dropdown>
                                )}
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



                        {viewportMode === 'tree' && (
                        <div className={'mi-window-body'}>
                            <div className={'mi-pa-12'}>
                                <Button
                                 
                                 color={'default'} size={'small'}>
                                    Показать завершенные
                                </Button>
                            </div>
                            <div>
                                <div className='mi-flat-task-stack-combo'>

                                    {nodeCollection && nodeCollection?.map((item)=>(
                                        <>
                                            {item && (
                                          <TreeTaskRowCard
                                            key={item.key}
                                            on_change_title={handleChangeTaskTitle}
                                            data={item}
                                            on_add_task={handleAddTask}
                                            on_add_section={handleAddSection}
                                            on_delete_node={handleDeleteNode}
                                            on_enter_editor={handleEnterEditor}
                                              level={getLevel({ children: baseNodeCollection }, item.key)}
                                            />
                                            )}
                                        </>

                                    ))}
                                    {activeNode === 'root' && (

                                      <div
                                      className={'mi-pseudo-card-create-trigger'}
                                        onClick={()=>{handleAddSection('after', null)} }
                                      >
                                      Создать секцию
                                      </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        )}
                        {viewportMode === 'editor' && (
                        <div className={'mi-window-body'}>
                            <TreeTaskEditor
                                data={selectedNode}

                            />
                        </div>
                        )}
                    </div>


                </div>
                <br/>

        </div>
    </div>
           
        </div>{/*  END OF MI_LAYOUT BODY */}
    </div>
  );
};

export default TreeTaskPage;
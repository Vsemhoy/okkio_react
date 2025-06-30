import { BarsOutlined, DeleteOutlined, DownCircleOutlined, DownSquareOutlined, EnterOutlined, FileMarkdownOutlined, FolderOutlined, PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import InputContentEditable from '../../../../components/MimiTemplate/components/CONTENTEDITABLE/InputContentEditable';
import InputContent from '../../../../components/MimiTemplate/components/CONTENTEDITABLE/InputContent';







const TreeTaskRowCard = (props) => {

    const [item, setItem] = useState(props.data);
    const [level, setLevel] = useState(props.level ? props.level : 0);

    const [itemTitle, setItemTitle] = useState(props.data?.title);

    const [menuItems, setMenuItems] = useState([]);



    const changeTitleText = (value) => {
        // console.log('ev', ev)
        setItemTitle(value);
        if (props.on_change_title){
          props.on_change_title(item.id, value);
        }
    }

  useEffect(() => {
    setItem(props.data)
  }, [props.data]);


  const deleteNodeCallBack = (idCollection) => {
    console.log('idCollection', idCollection)
  }

  const handleDeleteNode = () => {
    if (props.on_delete_node){
      props.on_delete_node(item.id, deleteNodeCallBack);
    }
  }

    const handleAddSectionBelow = () => {
      if (props.on_add_section){
        props.on_add_section('after', item.id)
      }
    }

    const handleAddChildSection = () => {
      if (props.on_add_section){
        props.on_add_section('child', item.id)
      }
    }

    const handleAddTaskBelow = () => {
      if (props.on_add_task){
        props.on_add_task('after', item.id)
      }
    }

    const handleAddChildTask = () => {
      if (props.on_add_task){
        props.on_add_task('child', item.id)
      }
    }

    useEffect(() => {
        let newMenu = [];
        newMenu.push({
          key: '5',
          label: (
            <div onClick={handleDeleteNode}>
              Удалить
            </div>
          ),
          icon: <DeleteOutlined />,
          danger: true
        });
        // нельзя создавать секции ниже 3 уровня
        if (item.type === 'section' && props.level < 3)
        {
          newMenu.push({
            key: '4',
            label: (
              <div onClick={handleAddSectionBelow}>
                Добавить секцию
              </div>
            ),
            icon: <PlusSquareOutlined />
          });
          newMenu.push({
            key: '1',
            label: (
              <div onClick={handleAddChildSection}>
            Добавить подсекцию
          </div>
        ),
        icon: <DownSquareOutlined />
      });
    }
    // Запрет создавать задачи на 1 уровне (в корне проекта)
    if (level > 1){
      newMenu.push({
        key: '2',
        label: (
          <div onClick={handleAddTaskBelow}>
            Добавить задачу
          </div>
        ),
        icon: <PlusCircleOutlined />
      });
    }
      newMenu.push({
        key: '3',
        label: (
          <div onClick={handleAddChildTask}>
            Добавить подзадачу
          </div>
        ),
        icon: <DownCircleOutlined />
      });
      setMenuItems(newMenu);
    }, [item]);




    const handleEnterEditor = (ev)=>{
      ev.preventDefault();
      if (props.on_enter_editor){
        props.on_enter_editor(item.id);
      }
    }

  return (
    <div className={`mi-flat-task-wrapper mi-level-${level}`}>
        <div className={`mi-flat-task  ${item.type === 'section' ? 'mi-ft-section-item' : ''}`}>
            <div className={'mi-flat-task-root'}
              onClick={handleEnterEditor}
            >
                {item.type === 'section' ? <FolderOutlined /> : <FileMarkdownOutlined />}
            </div>
            <div className={'mi-flat-task-body'}>
                <div className={'mi-flat-task-first-stage'}>
                    <div className={'mi-flat-task-content'}>

                        <InputContent
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
                    <TreeTaskRowCard
                      on_change_title={props.on_change_title}
                      data={subItem}
                      level={level + 1}
                      key={subItem.key}
                      on_add_section={props.on_add_section}
                      on_add_task={props.on_add_task}
                      on_delete_node={props.on_delete_node}
                      on_enter_editor={props.on_enter_editor}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

export default TreeTaskRowCard;
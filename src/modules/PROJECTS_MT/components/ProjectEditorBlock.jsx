import { Button, Input, Radio, Select } from 'antd';
import React, { useEffect, useState, useId } from 'react';
import TreeTaskEditorSettingsForm from '../../TASKER_MT/TREETASK_MT/components/TreeTaskEditorSettingsForm';
import MDEditor, {commands} from '@uiw/react-md-editor';
import { addProject, updateProject } from '../../../storage/projectsSlice';
import { v4 as uuidv4 } from 'uuid';
import { SaveOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const generateShortId = (length = 25) => {
  // Удаляем дефисы и обрезаем до 25 символов
  return uuidv4().replace(/-/g, '').substring(0, 25);
}



const ProjectEditorBlock = (props) => {
    const dispatch = useDispatch();
    const [item, setItem] = useState(props.data);
    const [itemId, setItemId] = useState(null);

  // Состояние формы
  const [name, setName] = useState(props.data?.name || '');
  const [content, setContent] = useState(props.data?.text || '# Новое описание');
  const [parentProjectId, setParentProjectId] = useState(props.data?.parent_project_id || null);
  const [visibleRule, setVisibleRule] = useState(props.data?.visible_rule || 0);

  const [publicAccessKey, setPublicAccessKey] = useState(props.data?.public_access_key || null);
  const [projectLink, setProjectLink] = useState(props.data?.project_link || '');
  const [currentVersion, setCurrentVersion] = useState(props.data?.current_version || '0.0.1');
  const [sortOrder, setSortOrder] = useState(props.data?.sort_order || 0);
  const [deleted, setDeleted] = useState(props.data?.deleted || 0);

    const [t_visibleType, set_visibleType] = useState(visibleRule > 0 ? 1 : 0);

    useEffect(() => {
        console.log('props.visible_rules', props.visible_rules)
        if (props.data){
            setDeleted(props.data?.deleted)
            setItemId(props.data.id);
        } else {
            setDeleted(0);
        }
        console.log('props.data', props.data)
    }, [props.data]);

    const [editMode, setEditMode] = useState(true);

    const handleContentChange = (value) => {
        setContent(value);
    }

    const handleDiscard = ()=> {
        if (props.on_discard){
            props.on_discard();
        }
    }

    // Создание нового проекта
    const handleCreateProject = () => {
        const newProject = {
        id: generateShortId(),
        parent_project_id: parentProjectId || null,
        name: name || 'Новый проект',
        text: content,
        visible_rule: visibleRule,
        project_link: projectLink || `/projects/${generateShortId(8)}`,
        current_version: currentVersion,
        sort_order: sortOrder,
        public_access_key: publicAccessKey,
        deleted
        };

        dispatch(addProject(newProject));
        props.on_save?.();
    };

    // Обновление существующего проекта
    const handleSaveData = () => {
        const updatedProject = {
            id: props.data.id,
            parent_project_id: parentProjectId,
            name,
            text: content,
            visible_rule: visibleRule,
            project_link: projectLink,
            current_version: currentVersion,
            sort_order: sortOrder,
            public_access_key: publicAccessKey,
            deleted
        };

        // 🚀 Диспатчим обновление
        dispatch(updateProject({ 
            id: props.data.id, 
            changes: updatedProject 
        }));

        // 📌 Опционально: вызываем on_save
        props.on_save?.();
    };

    const generatePkey = ()=>{
        if (publicAccessKey){
            setPublicAccessKey(null);
        } else {
            setPublicAccessKey(generateShortId);
        }
    }

  return (
    <div className='' >
        <div className={'mi-flex-space mi-pa-12 mi-tool-panel'}>
            <div>

            </div>
            <div className={'mi-flex-gap'}>
                
                <Button type="secondary"
                    onClick={handleDiscard}
                >Отменить</Button>
                {itemId === null ? (
                <Button
                    onClick={handleCreateProject}
                 type="primary">Создать</Button>
                ):(
                <Button
                    onClick={handleSaveData}
                 type="primary"
                    icon={<SaveOutlined />}
                 >Сохранить</Button>

                )}
            </div>
        </div>

        <div className={'mi-task-editor-layout'}>

            <div data-color-mode="light" style={{ backgroundColor: "#fff", color: "#000" }}>
            {editMode ? (
                <div >
                <div className={'mi-pa-12'}>
                    <Input value={name} 
                        onChange={(ev)=>{setName(ev.target.value)}}
                        placeholder={'Название проекта'}
                        maxLength={128}
                    />
                </div>
                <MDEditor
                    style={{minHeight: 'calc(100vh - 250px)'}}
                    value={content}
                    preview={'edit'}
                    className="markdown-body--light"
                    onChange={handleContentChange}
                    commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.divider,
                    commands.title3,
                    commands.title4,
                    commands.title5,
                    commands.divider,
                    commands.link,
                    commands.issue,
                    commands.quote,
                    commands.code,
                    commands.codeBlock,
                    commands.comment,
                    commands.image,
                    commands.table,
                    commands.divider,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                    commands.divider,
                    commands.help
                ]}
                                    ></MDEditor>
                                    </div>

            ):(
                <div className='mi-pa-12'>
            <MDEditor.Markdown source={content} />
                </div>
            )}


        </div>

            <div className='mi-pa-12'>
                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Родительский проект ID
                    </div>
                    <div className={'mi-form-input'}>
                        <Input type="number"
                        value={parentProjectId}
                        min={1} max={999}
                        onChange={(ev)=>{setParentProjectId(ev.target.value)}}
                        placeholder={'можно оставить пустым'}
                        />
                    </div>
                </div>

                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Правило видимости
                    </div>
                    <div style={{paddingBottom: '6px'}}>
                        <Radio.Group onChange={(ev)=>{set_visibleType(ev.target.value)}} value={t_visibleType}>
                            <Radio value={0}>Общие</Radio>
                            <Radio value={1}>ACL</Radio>
                        </Radio.Group>
                            
                    </div>
                    <div className={'mi-form-input'}>
                        {t_visibleType === 0 ? (
                            <Select 
                                placeholder={'укажите тип доступа'}
                                style={{width: '100%'}}
                                value={visibleRule}
                                onChange={setVisibleRule}
                                options={
                                    props.visible_rules?.map((rul)=>
                                        ({
                                            key: `rulv_${rul.id}`,
                                            value: rul.id,
                                            label: rul.title
                                        })
                                    )
                                }
                                />
                        ) : (
                            <Input
                            type={'number'} value={visibleRule} min={1} max={1000} placeholder='Введите номер ACL' />
                        )}

                    </div>
                </div>

                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Ключ публичного доступа
                    </div>
                    <div className={'mi-form-input'}>
                        <Input 
                            onDoubleClick={generatePkey}
                            onChange={(ev)=>{setPublicAccessKey(ev.target.value.trim())}}
                            value={publicAccessKey}
                            maxLength={25}
                            placeholder='для доступа любому пользователю'
                        />
                    </div>
                </div>

                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Текущая версия
                    </div>
                    <div className={'mi-form-input'}>
                        <Input 
                        onChange={(ev)=>{setCurrentVersion(ev.target.value)}}
                        value={currentVersion}
                        placeholder='0.0.1'
                        />
                    </div>
                </div>

                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Ссылка на рабочий проект
                    </div>
                    <div className={'mi-form-input'}>
                        <Input 
                        onChange={(ev)=>{setCurrentVersion(ev.target.value)}}
                        value={projectLink}
                        placeholder='localhost/hello_wolf'
                        maxLength={128}
                        />
                    </div>
                </div>

                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Порядок сортировки
                    </div>
                    <div className={'mi-form-input'}>
                        <Input type={'number'}
                        placeholder='укажите число'
                        onChange={(ev)=>{setSortOrder(ev.target.value)}}
                        value={sortOrder}
                        />
                    </div>
                </div>

                <div className={'mi-form-item'}>
                    <div className={'mi-form-label'}>
                        Удален
                    </div>
                    <div className={'mi-form-input'}>
                        <Select
                        value={deleted === null ? 0 : deleted}
                        onChange={(v)=>{setDeleted(v)}}
                        style={{width: '100%'}}
                            options={[
                                {
                                    key: '45234j',
                                    value: 0,
                                    label: 'Nope'
                                },
                                {
                                    key: 'dfasdfa',
                                    value: 1,
                                    label: 'Yes'
                                }
                            ]} ></Select>
                    </div>
                </div>
            </div>

        </div>
        


    </div>
  );
};

export default ProjectEditorBlock;
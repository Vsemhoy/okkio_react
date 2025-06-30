import { CloseOutlined, EditOutlined, Html5Outlined, MergeOutlined, MinusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import DevSideNavMt from '../../components/MimiTemplate/components/DEVSIDENAV/DevSidenavMt';
import { useSelector, useDispatch } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import { Button, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

import './components/style/projectspage.css';

import {setCurrentProject} from '../../storage/uiSlice';
import ProjectEditorBlock from './components/ProjectEditorBlock';

const ProjectPageMt = ({user_data, user_state}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const baseProjects = useSelector(state => state.projects.list);
    const activeProject = useSelector(state => state.ui.currentProject);
    const visibleRules = useSelector(state => state.options.visibleRules);


    const [selectedNode, setSelectedNode] = useState(null);
    const [viewportMode, setViewportMode] = useState('list');

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        setProjects(baseProjects);
        if (selectedNode){
            setSelectedNode(baseProjects.find((item)=>item.id === selectedNode.id))
        }
        console.log('reload', baseProjects)
    }, [baseProjects]);

    console.log('activeProject', activeProject)

    const handleSetActiveProject = (id, name) => {
        const no = {
            id: id,
            name: name,
        };
        dispatch(setCurrentProject(no));
    }


    const handleOpenEditor = (id) => {
        setSelectedNode(baseProjects.find((item)=> item.id === id));
        setViewportMode('editor');
        let q = document.querySelector('#top');
        if (q){
            q.scrollIntoView({ 
        behavior: 'auto',
        block: 'start'
      });
        }
    }

    const hanleCloseEditor = () => {
        setViewportMode('list');
        setSelectedNode(null);
    }

  return (
        <div className={`mi-page-layout ${user_state?.role == 'developer' ? 'mi-layout-dev' : 'mi-layout-client'}`}
        
        >
        {user_state?.role == 'developer' && (
            <DevSideNavMt />
        )}
        <div className={'mi-layout-body'}><div className={'mi-page-wrapper'}>
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
    
 
                            
                        </div>

                        </div>
                    </div>



                    <div className={'mi-window'}>
                        <div className={'mi-window-control'}>
                            <div  className={'mi-window-topbar-tabs mi-flex'}>

                                <div
                                    onClick={()=>{setViewportMode('list')}}
                                 className={`mi-window-topbar-tab ${viewportMode === 'list' ? 'active' : ''}`} 
                                    >
                                    <span style={{marginRight: '6px'}}>
                                        <Html5Outlined />
                                    </span> 
                                    <span>Список проектов</span>
                                </div>
                                {selectedNode !== null && (
                                    <div className={`mi-window-topbar-tab ${viewportMode === 'editor' ? 'active' : ''}`} 
                                        >
                                        <span style={{marginRight: '6px'}}>
                                            <EditOutlined />
                                        </span> 
                                        <span
                                            onClick={()=>{setViewportMode('editor')}}
                                        >{selectedNode != null ?  'Редактор проекта' : 'Новый проект'}</span>
                                        <span 
                                            style={{marginLeft: '6px'}}
                                            onClick={hanleCloseEditor}
                                            title='закрыть редактор'>
                                            <CloseOutlined />
                                            </span>
                                    </div>
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
                        <div className={'mi-window-body'}>

                            {viewportMode === 'list' && (
                                <div>
                                    <div className={'mi-flex-space mi-pa-12'}>
                                        <div>
                                            <Pagination 

                                            />
                                        </div>
                                        <div>
                                            <Button type="primary"
                                                onClick={()=>{handleOpenEditor('new')}}
                                            >Создать</Button>
                                        </div>
                                    </div>
                                    <div style={{ backgroundColor: "#fff", color: "#000" }}>

                                    {projects.map((project, index) => (
                                        <div className={`mi-pa-12 project-card-box ${activeProject?.id === project.id ? 'active':''}`} data-color-mode={`${index % 2 ? 'light' : 'dark'}`}>
                                            <div className='mi-flex-space' style={{borderBottom: '1px solid gray'}}>
                                                <div style={{fontSize: 'x-large', fontWeight: '600', color: `${index % 2 ? 'black' : 'white'}`}}>{project.name}</div>
                                                <div className={'mi-flex-gap'}>
                                                {activeProject?.id !== project.id && (
                                                    <Button block size={'small'}
                                                        onClick={()=>{handleSetActiveProject(project.id, project.name)}}
                                                    >Активировать</Button>
                                                )}
                                                <Button block size={'small'}
                                                    onClick={()=>{handleOpenEditor(project.id)}}
                                                >Редактировать</Button>
                                                </div>
                                            </div>
                                            <div>
                                                <div key={project.id} title={project.name} style={{ marginBottom: '16px' }}>
                                                <MDEditor.Markdown source={project.text} />
                                                    <div style={{ marginTop: '12px', fontSize: '0.9em', color: '#666' }}>
                                                        Версия: {project.current_version}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            )}
                            {viewportMode === 'editor' && (
                                <ProjectEditorBlock 
                                    on_discard={hanleCloseEditor}
                                    data={selectedNode}
                                    visible_rules={visibleRules}
                                />
                            )}

                        </div>
                    </div>
                </div>
                <br/>
        </div>
    </div>
           
        </div>{/*  END OF MI_LAYOUT BODY */}
    </div>
  );
};

export default ProjectPageMt;
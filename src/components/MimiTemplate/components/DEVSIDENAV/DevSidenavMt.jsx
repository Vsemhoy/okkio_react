import React, { useEffect, useState, useRef } from 'react';
import './devsidenavmt.css';
import { DropboxOutlined, FileWordFilled, Html5Filled, SettingFilled } from '@ant-design/icons';
import { Affix } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../../../../storage/uiSlice';

const DevSideNavMt = (props) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [openedBlock, setOpenedBlock] = useState(null);

     const [isHoveringBlock, setIsHoveringBlock] = useState(false);
    const menuRef = useRef(null);
    const blockRef = useRef(null);
    const activeTimer = useRef(null);

        // Очищаем таймер при размонтировании
    useEffect(() => {
        return () => {
            if (activeTimer.current) clearTimeout(activeTimer.current);
        };
    }, []);

    const menuItems = [
        {
            key: '5342',
            label: 'Проекты',
            block: 'projects',
            icon: <Html5Filled />
        },
        {
            key: '53442',
            label: 'Ресурсы',
            block: 'resources',
            icon: <DropboxOutlined />
        },
        {
            key: '5342442',
            label: 'Документы',
            block: 'docs',
            icon: <FileWordFilled />
        }
    ]

    const handleMouseEnter = () => {
        setTimeout(() => {
            setMenuOpened(true);
        }, 200);
    }

    const handleMouseLeave = ()=>{
        setTimeout(() => {
            setMenuOpened(false);
        }, 800);
    }

    // const handleChangeActiveBlock = (targetBlock)=>{
    //     setTimeout(() => {
    //         setOpenedBlock(targetBlock);
    //     }, 300);
    // }

    const handleChangeActiveBlock = (targetBlock) => {
        if (activeTimer.current) clearTimeout(activeTimer.current);
        
        // Если мышь уже на блоке, не меняем активный блок
        if (!isHoveringBlock) {
            activeTimer.current = setTimeout(() => {
                setOpenedBlock(targetBlock);
                setMenuOpened(true);
            }, 150); // Уменьшенная задержка для более плавного перехода
        }
    };

  return (
    <Affix offsetTop={40}>
    <div className={'mi-devsidebar'}>
        <div className={`mi-devside-menu ${menuOpened ? 'mi-devside-menu-wide' : 'mi-devside-menu-narrow'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={'mi-devmenu-columns'}>
                <div>
                    {menuItems.map((mit)=>(
                        <div
                            onMouseEnter={()=>{handleChangeActiveBlock(mit.block)}}
                            className={'mi-ds-menu-item'}
                        >{mit.icon}</div>
                    ))}
                </div>
                <div
                    className={'mi-ds-menu-block'}
                    onMouseEnter={()=>{handleChangeActiveBlock(openedBlock)}}
                >
                    <div className='mi-pa-12 mi-flex-space'>
                        <span>{menuItems.find((item)=>item.block === openedBlock)?.label}</span><span><SettingFilled /></span>
                    </div>
                    {openedBlock === 'projects' && (
                        <ProjectBlock 

                        ></ProjectBlock>
                    )}
                </div>
            </div>
        </div>
    </div>
    </Affix>
  );
};

export default DevSideNavMt;


const ProjectBlock = (props)=>{
    const [activeItem, setActiveItem] = useState(null);
    const baseProjects = useSelector(state => state.projects.list);
    const activeProject = useSelector(state => state.ui.currentProject);
    const [projects, setProjects] = useState([]);
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        setProjects(baseProjects.filter((item)=> item.id !== activeProject?.id));
        const acProject = baseProjects.find(item => item.id === activeProject?.id);
        if (acProject){
            setActiveItem(acProject);
        }
    }, [baseProjects, activeProject]);


    const handleSetActiveProject = (id, name) => {
        const no = {
            id: id,
            name: name,
        };
        dispatch(setCurrentProject(no));
    }

    return (
        <div>

            <div className={'mi-ds-menu-proj-stack'}>
                <div className={'mi-ds-menu-proj-stack-item'}>
                    {activeItem && (
                        <div className={'mi-ds-menu-proj-card-item active'}>
                            <div className={'mi-ds-menu-proj-card-item-name'}>
                            {activeItem.name}
                            </div>
                        </div>
                    )}
                    {projects.map((porridge, i)=>(
                        <div className={'mi-ds-menu-proj-card-item'}
                            onClick={()=>{handleSetActiveProject(porridge.id, porridge.name)}}
                            >
                            <div className={'mi-ds-menu-proj-card-item-name'}>
                            {porridge.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
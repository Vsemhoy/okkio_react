import React, { useEffect, useState, useRef } from 'react';
import './devsidenavmt.css';
import { CloseOutlined, DropboxOutlined, FileWordFilled, Html5Filled, MenuUnfoldOutlined, SettingFilled } from '@ant-design/icons';
import { Affix, Button } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentProject } from '../../../../storage/uiSlice';
import { useLayoutStorage } from '../../../../storage/localstorage/LayoutStorage';
import dayjs from 'dayjs';


const DevSideNavMt = (props) => {
  const {
    getOpenSidebar,
    setOpenSidebar,
    storage
  } = useLayoutStorage();

  const [menuSlided, setMenuSlided] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [openedBlock, setOpenedBlock] = useState(null);
  const [isHoveringBlock, setIsHoveringBlock] = useState(false);
  const [activeItem, setActiveItem] = useState(props.active_item);
  const [sideItems, setSideItems] = useState(props.items);
  const menuRef = useRef(null);
  const blockRef = useRef(null);
  const activeTimer = useRef(null);


  useEffect(() => {
    setSideItems(props.items);
  }, [props.items]);

  useEffect(() => {
    setActiveItem(props.active_item);
  }, [props.active_item]);

  useEffect(() => {
    return () => {
      if (activeTimer.current) clearTimeout(activeTimer.current);
    };
  }, []);

  // Следим за изменениями в хранилище
  useEffect(() => {
    setMenuSlided(getOpenSidebar());
  }, [props.on_callback]); // Реагируем на изменения openSidebar

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
  ];

  const handleMouseEnter = () => {
    setTimeout(() => {
      setMenuOpened(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setMenuOpened(false);

    }, 800);
  };

  const handleChangeActiveBlock = (targetBlock) => {
    if (activeTimer.current) clearTimeout(activeTimer.current);
    
    if (!isHoveringBlock) {
      activeTimer.current = setTimeout(() => {
        setOpenedBlock(targetBlock);
        setMenuOpened(true);
      }, 150);
    }
  };

  useEffect(() => {
    if (props.on_change_item){
      props.on_change_item(activeItem);
    }
  }, [activeItem]);


  useEffect(() => {
    if (props.layout_change_callback){
      props.layout_change_callback(dayjs().unix());
  
    }
  }, [storage]);

  return (
    <div>
      

      <div className={`mi-devsider-topper  ${getOpenSidebar() ? "mds-opened-topper" : "mds-closed-topper"}`}>
          {getOpenSidebar() ? (
            <Button 
              type="text" 
            
              onClick={() => setOpenSidebar(false)}
            >
              <CloseOutlined />
            </Button>
          ) : (
            <Button 
              type="text" 
        
              onClick={() => setOpenSidebar(true)}
            >
              <MenuUnfoldOutlined />
            </Button>
          )}
        </div>
        <div 
        onClick={() => setOpenSidebar(true)}
        className={`mi-devsider-rail-topper  ${getOpenSidebar() ? "mds-opened-rail-topper" : "mds-closed-rail-topper"}`}>

        </div>
      
    <Affix offsetTop={40}>
      <div className={`mi-devsidebar ${menuSlided ? "mi-devsidebar-opened" : "mi-devsidebar-closed"}`}>

        <div 
          className={`mi-devside-menu ${menuOpened ? 'mi-devside-menu-wide' : 'mi-devside-menu-narrow'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={'mi-devmenu-columns'}>
            <div>
              {menuItems.map((mit) => (
                <div
                  key={mit.key}
                  onMouseEnter={() => {handleChangeActiveBlock(mit.block)}}
                  className={`mi-ds-menu-item `}
                >
                  {mit.icon}
                </div>
              ))}
            </div>
            <div
              className={'mi-ds-menu-block'}
              onMouseEnter={() => {handleChangeActiveBlock(openedBlock)}}
            >
              <div className='mi-pa-12 mi-flex-space'>
                <span>{props.title}</span>
                <span><SettingFilled /></span>
              </div>
              {/* {openedBlock === 'projects' && (
                <ProjectBlock />
              )} */}


                <div>
                  <div className={'mi-ds-menu-proj-stack'}>
                      <div className={'mi-ds-menu-proj-stack-item'}>
                          {/* {activeItem && (
                              <div className={'mi-ds-menu-proj-card-item active'}>
                                  <div className={'mi-ds-menu-proj-card-item-name'}>
                                  {activeItem.name}
                                  </div>
                              </div>
                          )} */}
                          {sideItems.map((sideItem, i)=>(
                              <div 
                                key={sideItem.key}
                              className={`mi-ds-menu-proj-card-item ${sideItem.id === activeItem ? 'active' : ''}`}
                                  onClick={()=>{setActiveItem(sideItem.id)}}
                                  >
                                  <div className={'mi-ds-menu-proj-card-item-name'}>
                                  {sideItem.label}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </Affix>
    </div>
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
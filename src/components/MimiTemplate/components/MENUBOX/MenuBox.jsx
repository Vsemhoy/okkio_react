import React, { useContext, useEffect, useState } from 'react';

import './style/menubox.css';
import { Affix, Button, Dropdown } from 'antd';

import { AndroidOutlined, AuditOutlined, BarsOutlined, CloseOutlined, DropboxOutlined, FundProjectionScreenOutlined, HomeOutlined, Html5Outlined, LinuxOutlined, PaperClipOutlined, PartitionOutlined, ProjectOutlined, QuestionOutlined, RocketOutlined, UserOutlined, WechatWorkOutlined, YahooOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { USER_STATE } from '../../../../config/config';
import AuthModal from '../../../Auth/AuthModal';
import { logout, useAuth } from '../../../../Hooks/UseAuth';









const MenuBox = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttSize = 'large';
  const [userData, setUserData] = useState(null);

  // Проверяем авторизацию при загрузке
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) console.log('Пользователь уже авторизован');
  }, []);


  const authCallBack = (token, user) => {
    if (props.on_auth){
      props.on_auth(token, user);
    }
  }

  useEffect(() => {
    setUserData(props.user_data);
  }, [props.user_data]);

  const handleLogout = () => {
    let result = logout();
    if (result){
      props.on_auth(null, null);
    }
  }

const clientItems = [
  {
    label: <div
      onClick={handleLogout}
    >Logout</div>,
    key: '1535',
    icon: <WechatWorkOutlined />,
  },
];

const developerItems = [
  {
    label: <NavLink to={'/dev/projects'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
            Проекты
        </NavLink>,
    key: '11',
    icon: <Html5Outlined />,
  },
  {
    label: <NavLink to={'/dev/resources'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
            Ресурсы
        </NavLink>,
    key: '21',
    icon: <PaperClipOutlined />,
  },
  {
    label: <NavLink to={'/dev/documents'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          Документы  
        </NavLink>,
    key: '13',
    icon: <AuditOutlined />,
  },
];


  return (
    // <Affix offsetTop={0}>
    <div className={'mi-container mi-bg-base mi-block-menu mi-br-3'} >
      
      <div className={'mi-flex'}>
       <NavLink to={'/home'}
       className={({ isActive }) => isActive ? 'mi-active' : ''}
       >
          <div className={''}>
          <Button type="text" size={buttSize}>
            <CloseOutlined />

          </Button>
          </div>
        </NavLink>
      </div>
      <div className={'mi-flex'}>

        <NavLink to={'/'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          <Button type="text" size={buttSize}
          icon={<FundProjectionScreenOutlined />}
          >
            Главная
          </Button>
        </NavLink>

        <NavLink to={'/eventor'} 
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
 
            <Button type="text" size={buttSize}
              icon={<LinuxOutlined />}
            >
              Eventor
            </Button>
      

        </NavLink>

        {/* <Dropdown menu={{items: developerItems}}>
          <Button type="text" size={buttSize}
            icon={<AndroidOutlined />}
          >
            Budger
          </Button>
      </Dropdown>

        <NavLink to={'/dev/kanban'} 
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          <Button type="text" size={buttSize}
            icon={<ProjectOutlined />}
          >
            Канбан
          </Button>
        </NavLink>
        <NavLink to={'/dev/tree'} 
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          <Button type="text" size={buttSize}
          icon={<PartitionOutlined />}
          >
            Дерево
          </Button>
        </NavLink> */}

        {/* <NavLink to={'/executor'} 
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          <Button type="text" size={buttSize}>
            Цех
          </Button>
        </NavLink>
        <NavLink to={'/taskup'} 
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          <Button type="text" size={buttSize}>
            Task Up!
          </Button>
        </NavLink> */}
      </div>
      <div className={'mi-flex'}>
        <NavLink to={'/settings'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
          <Button type="text" size={buttSize}>
            Настройки
          </Button>
        </NavLink>

          {userData == null ? (
            <div>
              <Button
                size={buttSize}
                style={{borderRadius: '0px'}}
                onClick={() => setIsModalOpen(true)}
                type={'primary'}
                >Войти </Button>
              <AuthModal 
                visible={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onLoginSuccess={authCallBack}
              />
            </div>

          ) : (
            
            <div>
            <Dropdown menu={{items: clientItems}}>
              <Button
                size={buttSize}
                style={{borderRadius: '0px'}}
              >
                {userData.name}

              </Button>
              </Dropdown>
            </div>
          )}
      </div>

      <AuthModal />

    </div>
    // </Affix>
  );
};

export default MenuBox;
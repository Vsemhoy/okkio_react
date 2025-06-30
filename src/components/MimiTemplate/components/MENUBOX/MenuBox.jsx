import React, { useContext, useEffect, useState } from 'react';

import './style/menubox.css';
import { Affix, Button, Dropdown } from 'antd';

import { AndroidOutlined, AuditOutlined, BarsOutlined, CloseOutlined, DropboxOutlined, FundProjectionScreenOutlined, HomeOutlined, Html5Outlined, LinuxOutlined, PaperClipOutlined, PartitionOutlined, ProjectOutlined, QuestionOutlined, RocketOutlined, UserOutlined, WechatWorkOutlined, YahooOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { USER_STATE } from '../../../../config/config';

const MenuBox = (props) => {

  const buttSize = 'large';


const clientItems = [
  {
    label: <NavLink to={'/claims'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
            Заявки
        </NavLink>,
    key: '1',
    icon: <WechatWorkOutlined />,
  },
  {
    label: <NavLink to={'/questions'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
            Вопросы
        </NavLink>,
    key: '2',
    icon: <QuestionOutlined />,
  },
  {
    label: <NavLink to={'/releases'}
        className={({ isActive }) => isActive ? 'mi-active' : ''}
        >
            Релизы
        </NavLink>,
    key: '3',
    icon: <RocketOutlined />,
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

        <Dropdown menu={{items: developerItems}}>
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
        </NavLink>

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
      </div>
    </div>
    // </Affix>
  );
};

export default MenuBox;
import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, Skeleton, theme, Input, Dropdown, Avatar, Drawer, Button, Badge } from 'antd';
import { PRODMODE } from "../../../../CONFIG/config";
import { DS_USER } from "../../../../CONFIG/DEFAULTSTATE";
import MenuItem from "antd/es/menu/MenuItem";
import Search from 'antd/es/input/Search';
import { AppstoreAddOutlined, AppstoreOutlined, BarcodeOutlined, CalendarOutlined, CodeOutlined, ContainerOutlined, HomeOutlined, LogoutOutlined, MenuUnfoldOutlined, NotificationFilled, NotificationOutlined, SettingOutlined, SmileOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';
import MenuDivider from 'antd/es/menu/MenuDivider';


import ars_logo from './../../../../images/identics/arstel.svg';
import rondo_logo from './../../../../images/identics/rondo.png';



const { Header, Content, Footer } = Layout;



const CommonMenu14 = (props) => {
  const [userAct, setUserAct] = useState(!PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [notificatorOpened, setNotificatorOpened] = useState(false);
  const [notificatorLoading, setNotificatorLoading] = useState(true);
  const [countOfNotifications, setCountOfNotifications] = useState(0);
  const [acls, setAcls] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(0);

  const [noticePage, setNoticePage] = useState(1);
  const [noticeIgnore, setNoticeIgnore] = useState([]);



    useEffect(()=>{
        setCompanies(props.companies);
    },[props.companies])
    useEffect(()=>{
        setAcls(props.acls);
    },[props.acls])
    useEffect(()=>{
        setCurrentCompany(props.current_company);
    },[props.current_company])


    const userMenu = (
      <Menu>
        <Menu.Item key="status">Статус: Онлайн</Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Настройки
        </Menu.Item>
        <Menu.Item key="block" icon={<ThunderboltOutlined />}>
          Заблокировать
        </Menu.Item>
        { acls.includes(4) && (
        <Menu.Item key="adjklfa" icon={<NotificationOutlined />}>
          <a href='/skud/hr/notify'>Нотификатор</a>
        </Menu.Item>
        )}
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <a href='/logout'>Выйти</a>
        </Menu.Item>
      </Menu>
    );





    return (
<Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className={'sk-main-menu'}
      >
        <div style={{display: 'flex', minWidth: '162px', marginLeft: '22px'}}>
            
          <Dropdown
            
            menu={{ items: 
            companies.map((item)=>({
                    
              key: `mitem_${item.id}`,
              label: (
                  <a onClick={()=>{props.on_change_company(item)}}
                  ><span className='sk-r-badge' style={{backgroundColor: item.color}}> </span><span>{item.name}</span></a>
              ),
              // className: currentCompany == item.id ? "active_company" : "",
              className: `sk-company-trigger ${currentCompany === item.id ? "disabled" : ""}`,
            //   disabled: currentCompany === item.id,
              
            }))

          }}
          active={3}
          >
            <div className={'sk-main-logo'}>
                {!PRODMODE && (
                    <>
                        { currentCompany === 2 && (<img src={ars_logo} alt="Арстел" style={{ minHeight: '30px'}} />) }
                    
                        { currentCompany === 3 && (<img src={rondo_logo} alt="Рондо" style={{ minHeight: '30px'}} />) }

                        { currentCompany === 4 && (<img src={"/../../../../images/identics/affa.svg"} alt="Affa" style={{ minHeight: '30px'}} />) } 
                    </>
                )}
                {PRODMODE && (
                    <>
                        { currentCompany === 2 && (<img src={"./../../../../images/identics/arstel.svg"} alt="Арстел" style={{ minHeight: '30px'}} />) }
                    
                        { currentCompany === 3 && (<img src={"/../../../../images/identics/rondo.png"} alt="Рондо" style={{ minHeight: '30px'}} />) }

                        { currentCompany === 4 && (<img src={"/../../../../images/identics/affa.svg"} alt="Affa" style={{ minHeight: '30px'}} />) }
                    </>
                )}

            </div>
          </Dropdown>
        </div>
        {/* Первая группа */}
        <Menu mode="horizontal" style={{ background: '#00000000', flex: 1}}>
          {/* <Menu.Item key="home" icon={<HomeOutlined  style={{ fontSize: '20px', color: '#fff', marginTop: '6px',
           textAlign: 'center', paddingLeft: '6px' }} />} ><a href={HTTP_ROOT}></a></Menu.Item> */}

          {/* Здесь конкретного доступа нет - входят все */}

          { acls.includes(2) && (
            <MenuItem
              icon={<CalendarOutlined />}
              key={'menu_52d35hg4'}>
                <a href='/skud'>СКУД
                </a>
              </MenuItem>
         )}
            
          { acls.includes(51) && (
            <MenuItem
            icon={<BarcodeOutlined />}
              key={'menu_52fdd3453f4'}>
                <a href='/newsales'>Отдел продаж</a>
              </MenuItem>
          )}
          
            { acls.includes(104) && (
            <MenuItem
              icon={<ContainerOutlined />}
              key={'menu_52fdd3sdg453f4'}>
                <a href='/certification'>Сертификация</a>
            </MenuItem>
            )}

            { (acls.includes(2) || acls.includes(135) || acls.includes(137)) && (
            
            <Menu.SubMenu key="menu1" title="Утилиты"
              icon={<CodeOutlined />}
            >
            { acls.includes(135) && (
              <MenuItem
              key={'menu_52dggh34'}>
                <a href='/currency'>Курсы валют</a>
              </MenuItem>
            )}

            { acls.includes(137) && (
              <MenuItem
              key={'menu_5dss2s34'}>
                <a href='/utils/zword'>Синонимайзер для Sales</a>
              </MenuItem>
            )}

            { acls.includes(2) && (
              <MenuItem
              key={'menu_52ssdf34'}>
                <a href='/pechkin'>Проброс запроса</a>
              </MenuItem>
            )}
            </Menu.SubMenu>
          )}




          { (acls.includes(121) || acls.includes(122) || acls.includes(124) || acls.includes(125)
          || acls.includes(82) || acls.includes(83) || acls.includes(36) || acls.includes(102)
        ) && (
          <Menu.SubMenu key="menu31" title="Дополнительно" icon={<AppstoreAddOutlined />}>

        { (acls.includes(121) || acls.includes(122) || acls.includes(124) || acls.includes(125)) && (
            <MenuItem
            key={'menu_d334hgfd'}>
              <a href='/import'>База Вэд</a>
            </MenuItem>
            )}

          { (acls.includes(82) || acls.includes(83)) && (
            <MenuItem
            key={'menu_5gfds34'}>
              <a href='/finance/timetable'>Табель</a>
            </MenuItem>
          )}
            
          { acls.includes(36) && (
            <MenuItem
            key={'menu_56gafdgsd34'}>
              <a href='/projects'>Проектный отдел</a>
            </MenuItem>
            
          )}
          { acls.includes(102) && (
            <MenuItem
            key={'menu_52asdf44'}>
              <a href='/catalog'>Каталог</a>
            </MenuItem>
          )}

          </Menu.SubMenu>
          )}

       
        </Menu>

        

        {/* Вторая группа */}
        {/* <Input.Search placeholder="Поиск" style={{ maxWidth: '200px', margin: '0 20px' }} /> */}

        {/* Третья группа */}
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <div onClick={props.on_show_notibar} style={{ cursor: "pointer", marginRight: '24px'}}>
            <Badge count={countOfNotifications} offset={[2, 24]}>
            <Avatar style={{ backgroundColor: '#33333300', marginRight: '0px' }}>
                { userAct ? (
                  // <SmileOutlined  style={{ fontSize: '36px', color: '#08c' }} />
                  <NotificationOutlined style={{ fontSize: '36px', color: '#3d3d3d' }} />
                ) : (
                  <ThunderboltOutlined />
                )}
              </Avatar>
              </Badge>
            </div>


          <Dropdown overlay={userMenu} trigger={['hover']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>

              { userAct && userAct.user ? (
                <span style={{fontWeight: 500, color: "#3d3d3d"}}>{userAct.user.name} {userAct.user.patronymic}</span>
              ) : (
              <span>Пользователь</span>

              )}
            </div>
          </Dropdown>
        </div>

        { (acls.includes(143) || acls.includes(14)) && (
        <Menu mode="horizontal" style={{ background: '#00000000'}} title="Администрирование">

          <Menu.SubMenu key="menu331" title="" icon={<MenuUnfoldOutlined />}>
 
                <MenuItem disabled={true}>
                  Администрирование
                </MenuItem>
            
              <MenuDivider/>
              
              { acls.includes(143) && (
              <MenuItem
              key={'menu_d34'}>
                <a href='/admin/staff/manager'>Менеджер учётных записей</a>
              </MenuItem>
            )}
            { acls.includes(14) && (
              <MenuItem
              key={'menu_5344'}>
                <a href='/admin/access/aclmain'>ACL ALAN</a>
              </MenuItem>
              )}

            { acls.includes(14) && (
              <MenuItem
              key={'menu_32345344'}>
                <a href='/admin/access/section/skud'>ACL MAIN Classic</a>
              </MenuItem>
              )}
              
            { acls.includes(14) && (
              <MenuItem
              key={'menu_565434'}>
                <a href='/admin/access/aclcompanies'>Доступ сотрудников к компаниям</a>
              </MenuItem>
               )}
              
           { acls.includes(14) && (
              <MenuItem
              key={'menu_52к3544'}>
                <a href='/admin/access/aclmodels'>Доступ моделей к компаниям</a>
              </MenuItem>
            )}
              
              { acls.includes(14) && (
              <MenuItem
              key={'menu_52634564'}>
                <a href='/admin/info'>Инфо о доступах</a>
              </MenuItem>
            )}
            </Menu.SubMenu>
        </Menu>
          )}
            
            

      </Header>
    )
}

export default CommonMenu14;
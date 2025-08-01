import { BASE_NAME, BASE_ROUTE, CSRF_TOKEN, PRODMODE } from './config/config';
import logo from './logo.svg';
import './App.css';
import './assets/okkio_vars.css';
import './assets/okkio_layout.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';

// import { StateContext, StateProvider } from './Components/ComStateProvider25/ComStateProvider25';
// import { ParseRoute } from './Components/HybridEmbeddedRouter/RouteParser';

import {DS_USER} from './config/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import { Layout } from 'antd';

import MenuBox from './components/MimiTemplate/components/MENUBOX/MenuBox';
import MainFlowPage from './modules/MAINFLOW_MT/MainFlowPageMt';
import TreeTaskPage from './modules/TASKER_MT/TREETASK_MT/TreeTaskPage';
import KanbanPage from './modules/TASKER_MT/KANBAN_MT/KanbanPage';
import ProjectPageMt from './modules/PROJECTS_MT/ProjectsPageMt';
import EventorFlowPage from './modules/EVENTOR/FLOW/EventorFlowPage';
import { useAuthMonitor } from './Hooks/UseAuthMonitor';
import dayjs from 'dayjs';




function App() {
  const { isAuthenticated, handleLogout } = useAuthMonitor();
  const [userProfile, setUserProfile] = useState(null);

  // const [userProfile, setUserProfile] = useState(!PRODMODE ? DS_USER : []);

  const [pageLoaded, setPageLoaded] = useState(true);

  const [layoutCallback, setLayoutCallback] = useState(0);



  useEffect(() => {
      const profile = localStorage.getItem('user');
      setUserProfile(profile ? JSON.parse(profile) : null);
    }, [isAuthenticated]); // Зависимость от статуса авторизации

    // Пример защиты роутов
    // if (!isAuthenticated && userProfile) {
    //   handleLogout();
    //   return <Redirect to="/login" />;
    // }


  /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка отделов
     * @param {*} req 
     * @param {*} res 
     */
    const get_userdata = async (req, res) => {
      try {
          // setLoadingOrgs(true)
          const format_data = {
              CSRF_TOKEN,
              data: {
                  // ...filters,
                  // created_date: get_unix_by_datearray(filters.created_date),
                  // active_date: get_unix_by_datearray(filters.active_date)
              }
          }
          let response = await PROD_AXIOS_INSTANCE.get('/usda?_token=' + CSRF_TOKEN);
          console.log('me: ', response);
          setUserProfile(response.data);
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
          setPageLoaded(true);
      }
  }
  /** ------------------ FETCHES END ---------------- */

  const handleAuth = (token, user) => {
    if (token){
      setUserProfile(user);
    } else {
      setUserProfile(null);
    }
  }


  return (
    <Layout>
      <BrowserRouter basename={BASE_NAME}>
        <div id='top'>
          <MenuBox
            layout_change_callback={setLayoutCallback}
            user_data={userProfile}
            on_auth={handleAuth}
          />
          
            <Routes>
            <Route path={'/'} element={<MainFlowPage user_data={userProfile}/>} />
            {/* <Route path={BASE_ROUTE + '/'} element={<MainFlowPage user_data={userProfile}/>}  /> */}

            <Route path={'/dev/tree'} element={<TreeTaskPage userdata={userProfile} on_callback={layoutCallback}/>} />
            {/* <Route path={BASE_ROUTE + '/dev/tree'} element={<TreeTaskPage userdata={userProfile}/>}/> */}

            <Route path={'/dev/kanban'} element={<KanbanPage userdata={userProfile}/>} />
            {/* <Route path={BASE_ROUTE + '/dev/kanban'} element={<KanbanPage userdata={userProfile}/>}/> */}

            <Route path={'/dev/projects'} element={<ProjectPageMt userdata={userProfile}/>} />
            {/* <Route path={BASE_ROUTE + '/dev/projects'} element={<ProjectPageMt userdata={userProfile}/>}/> */}

            <Route path={'/eventor'} element={<EventorFlowPage userdata={userProfile}
              on_callback={layoutCallback}
              layout_change_callback={setLayoutCallback}
            />} />
            {/* <Route path={BASE_ROUTE + '/eventor'} element={<EventorFlowPage userdata={userProfile}/>}/> */}

            {/* <Route path={'/'} element={<MainPageUt userdata={userProfile}/>} />
            <Route path={BASE_ROUTE + '/'} element={<MainPageUt userdata={userProfile}/>}  />

            <Route path={'/db/tables'} element={<TableListPageUt userdata={userProfile}/>} />
            <Route path={BASE_ROUTE + '/db/tables'} element={<TableListPageUt userdata={userProfile}/>}  />
         
            <Route path={'/db/tables/:tableName'} element={<TableDataPageUt userdata={userProfile}/>} />
            <Route path={BASE_ROUTE + '/db/tables/:tableName'} element={<TableDataPageUt userdata={userProfile}/>}  /> */}
            </Routes>



        </div>




      </BrowserRouter>

    </Layout>
  );
}

export default App;

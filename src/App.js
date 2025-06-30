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


function App() {
  const [userProfile, setUserProfile] = useState(!PRODMODE ? DS_USER : []);
  const [USER_STATE, setUSER_STATE] = useState({
    role: 'client'
  });
  const [pageLoaded, setPageLoaded] = useState(true);

      useEffect(() => {
        if (PRODMODE){
          get_userdata();
        } else {
          setUSER_STATE(prevState => ({
            ...prevState, role: 'developer'
          }) )
        }
        
    }, []);

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


  return (
    <Layout>
      <BrowserRouter basename={BASE_NAME}>
        <div id='top'>
          <MenuBox
            user_state={USER_STATE}
          />
          
            <Routes>
            <Route path={'/'} element={<MainFlowPage user_data={userProfile} user_state={USER_STATE}/>} />
            <Route path={BASE_ROUTE + '/'} element={<MainFlowPage user_data={userProfile} user_state={USER_STATE}/>}  />

            <Route path={'/dev/tree'} element={<TreeTaskPage userdata={userProfile} user_state={USER_STATE}/>} />
            <Route path={BASE_ROUTE + '/dev/tree'} element={<TreeTaskPage userdata={userProfile} user_state={USER_STATE}/>}/>

            <Route path={'/dev/kanban'} element={<KanbanPage userdata={userProfile} user_state={USER_STATE}/>} />
            <Route path={BASE_ROUTE + '/dev/kanban'} element={<KanbanPage userdata={userProfile} user_state={USER_STATE}/>}/>

            <Route path={'/dev/projects'} element={<ProjectPageMt userdata={userProfile} user_state={USER_STATE}/>} />
            <Route path={BASE_ROUTE + '/dev/projects'} element={<ProjectPageMt userdata={userProfile} user_state={USER_STATE}/>}/>

            <Route path={'/eventor'} element={<EventorFlowPage userdata={userProfile} user_state={USER_STATE}/>} />
            <Route path={BASE_ROUTE + '/eventor'} element={<EventorFlowPage userdata={userProfile} user_state={USER_STATE}/>}/>

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

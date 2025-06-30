import React, { useContext, useState } from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";
import BreadCrumbBox from "../../../Components/MimiTemplate/components/BREADCRUMBS/BreadCrumbBox";
import ExecutorKanbanBoard from "./components/ExecutorKanbanBoard";
import { Button, Dropdown, Select } from "antd";
import { BilibiliOutlined, CodeSandboxOutlined, TwitchFilled, TwitchOutlined, CloseOutlined } from "@ant-design/icons";

const ExecutorEditorPage = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;

  const [openReleases, setOpenReleases] = useState(false);
  const [openClaims,   setOpenClaims]   = useState(false);
    

  const handleReleaseClose = ()=>{
    setOpenReleases(false);
  }
  const handleClaimClose = ()=>{
    setOpenClaims(false);
  }


    return (
        <div className={'mi-page-wrapper'}>
            <div className={"mi-ska-mw-1400"}>

                <br/>
            <BreadCrumbBox></BreadCrumbBox>
                <br />
            </div>

            <div className={'mi-ska-mw-1900 mi-pa-12'}>

                <div>
                    <div className={'mi-flex-space'}>
                         <div className="mi-flex" style={{gridGap: '12px'}}>
                            <Button danger icon={<CodeSandboxOutlined />}
                                onClick={()=>{setOpenReleases(true)}}
                                >
                                Релизы
                            </Button>
                            <Select 
                                placeholder={'Проект'}
                            />
                            <Select 
                                placeholder={'Раздел проекта'}
                            />
                        </div>
                        <div className="mi-flex" style={{gridGap: '12px'}}>
                            <Button danger icon={<CodeSandboxOutlined />} 
                                className={'mi-super-accent'}
                            >
                            <span>Активная заявка #5632456</span>
                                <span><CloseOutlined /> </span>
                            </Button>
                        </div>
                        <div className="mi-flex" style={{gridGap: '12px'}}>
                            <Button>Закрытые</Button>
                            <Dropdown.Button
                            menu={{items:
                                [
                                { id: 'waiting', title: 'Ожидает' },
                                { id: 'in_progress', title: 'В работе' },
                                { id: 'testing', title: 'Тестирование' },
                                { id: 'completed', title: 'Завершено' },
                                { id: 'rejected', title: 'Отклонено' },
                                { id: 'postponed', title: 'Отложено' }
                            ].map((item)=>{return {
                                key: item.id,
                                label: item.title
                            }})
                                // onClick: onMenuClick,
                            }}
                            >
                            Колонки
                            </Dropdown.Button>
                            <Button danger icon={<TwitchOutlined />} 
                                onClick={()=>{setOpenClaims(true)}}
                            >
                                Заявки
                            </Button>
                        </div>
                    </div>
                            <br />
                    <div>
                    <ExecutorKanbanBoard 
                        open_claims={openClaims}
                        open_releases={openReleases}
                        on_close_release={handleReleaseClose}
                        on_close_claims={handleClaimClose}
                    />
                    </div>
                   
                </div>


            </div>



        </div>
        
    )
};

export default ExecutorEditorPage;
import React, { useState } from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";
import { useContext } from "react";
import BreadCrumbBox from "../../../Components/MimiTemplate/components/BREADCRUMBS/BreadCrumbBox";
import { Affix, Button, Input, Pagination } from "antd";
import Her from "../../../Components/HybridEmbeddedRouter/Her";
import QuestFilter from "./components/QuestFilters";
import QuestCard25 from "./components/QuestCard25";
import QuestModal from "./components/QuestModal";

const QuestionListPage25 = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;

    const [openEditor, setOpenEditor] = useState(false);
    
    const [editedQuestId, setEditedQuestId] = useState(null);

    const handleCreateQuest = () => {
        setOpenEditor(true);
    };
    const handleEditQuest = (id) => {
        setEditedQuestId(id);
        setOpenEditor(true);
    };
    


    return (
        <div className={'mi-page-wrapper'}>
        <div className={"mi-ska-mw-1400"}>
            <br/>

            <BreadCrumbBox />
            <br/>

            <div className={'mi-page-body mi-layout-leftsidebar'}>
                <div>
                    <Affix offsetTop={0}>
                        <div className={'mi-bg-base mi-pa-9 mi-filter-sidebar'}>
                        <QuestFilter />
                        </div>
                        
                    </Affix>
                </div>
                <div>
                    <div className={'mi-flex-space'}>
                        <div className={'mi-pa-6'}>
                            <Pagination
                                showSizeChanger
                                // onShowSizeChange={onShowSizeChange}
                                defaultCurrent={3}
                                total={500}
                                disabled
                                />
                        </div>
                           
                            <Button
                                onClick={handleCreateQuest}
                            >
                                Задать вопрос
                            </Button>
                    
                    </div>
                    
                    <div className={'mi-mt-12'}>
                        <div className={'mi-content-stack'}>
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />
                            <QuestCard25 
                                on_open_editor={handleEditQuest}

                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <QuestModal
            set_open={openEditor}
            on_close={()=>{setOpenEditor(false)}}
        />

        </div>
    )
};

export default QuestionListPage25;
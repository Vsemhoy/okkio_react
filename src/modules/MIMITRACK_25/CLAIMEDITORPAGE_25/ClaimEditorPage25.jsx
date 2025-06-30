import React, { useContext, useState } from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";
import BreadCrumbBox from "../../../Components/MimiTemplate/components/BREADCRUMBS/BreadCrumbBox";
import ClaimEditorSidebar from "./components/ClaimEditorSidebar";
import { Affix, Button, Checkbox, Input, Tabs } from "antd";
import MDEditor, { commands } from "@uiw/react-md-editor";
import FilterRow from './../../../Components/MimiTemplate/components/FORMS/FilterRow';


const ClaimEditorPage = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;

    const [activeTab, setActiveTab] = useState(1);

    
    return (
        <div className={'mi-page-wrapper'}>
            <div className={"mi-ska-mw-1400"}>

                <br/>
                <BreadCrumbBox></BreadCrumbBox>
                <br/>
                
            

            <div className={'mi-page-body mi-layout-rightsidebar'}>

                <div>
                    <div className={'mi-flex-space'}>
                        <div>
                            <Tabs
                                defaultActiveKey={activeTab}
                                onChange={(key)=>{setActiveTab(key)}}
                                items={[
                                {
                                    label: `Основные поля`,
                                    key: 1,
                                    children: ``,
                                },
                                {
                                    label: `Дополнительные поля`,
                                    key: 2,
                                    children: ``,
                                }
                                ]}
                            />
                        </div>
                        <div>
                            <Button>
                                Save
                            </Button>
                            <Button>
                                Создать заявку
                            </Button>
                        </div>
                    </div>
                    
                    <div className={'mi-mt-12'}>
                    {activeTab === 1 ? (
                        <div>
                            <FilterRow label={'Превью описание'}>
                                <Input ></Input>
                            </FilterRow>
                            <div>
                                <FilterRow label={'Описание задачи'}>
                                    <MDEditor
                                        preview={'edit'}
                                        className="markdown-body--light"
                                                        commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.divider,
                    commands.title2,
                    commands.title3,
                    commands.title4,
                    commands.title5,
                    commands.divider,
                    commands.link,
                    commands.issue,
                    commands.quote,
                    commands.code,
                    commands.codeBlock,
                    commands.comment,
                    commands.image,
                    commands.table,
                    commands.divider,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                    commands.divider,
                    commands.help
                ]}
                                    ></MDEditor>
                                </FilterRow>
                            </div>
                            <div>
                                <FilterRow >
                                    <Checkbox >
                                        Форматировать текст как Markdown разметку
                                    </Checkbox>
                                </FilterRow>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <FilterRow label={'Заметка исполнителя'}>
                                    <MDEditor
                                        preview={'edit'}
                                        className="markdown-body--light"
                                        visibleEditors={['code']}
                commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    commands.hr,
                    commands.divider,
                    commands.title2,
                    commands.title3,
                    commands.title4,
                    commands.title5,
                    commands.divider,
                    commands.link,
                    commands.issue,
                    commands.quote,
                    commands.code,
                    commands.codeBlock,
                    commands.comment,
                    commands.image,
                    commands.table,
                    commands.divider,
                    commands.unorderedListCommand,
                    commands.orderedListCommand,
                    commands.checkedListCommand,
                    commands.divider,
                    commands.help
                ]}
                                    ></MDEditor>
                                </FilterRow>
                            </div>
                                              
                        </div>
                    )}
                      
                    </div>
                </div>
                <div>
                    <Affix offsetTop={0}>
                        <div className={'mi-bg-base mi-pa-9 mi-filter-sidebar'}>
                        <ClaimEditorSidebar />
                        </div>
                        
                    </Affix>
                </div>
            </div>
</div>
        </div>
    )
};

export default ClaimEditorPage;
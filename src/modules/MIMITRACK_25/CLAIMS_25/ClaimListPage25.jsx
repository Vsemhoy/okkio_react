import React, { useState } from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";
import { useContext } from "react";
import BreadCrumbBox from "../../../Components/MimiTemplate/components/BREADCRUMBS/BreadCrumbBox";
import { Affix, Button, Input, Pagination } from "antd";
import ClaimCard25 from "../../../Components/MimiTemplate/components/CLAIMCARD/ClaimCard25";
import ClaimFilters from "./components/ClaimsFilters";
import Her from "../../../Components/HybridEmbeddedRouter/Her";

const ClaimListPage = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;

    const [openClaimEditor, setOpenClaimEditor] = useState(false);
    

    const handleCreateClaim = () => {
        setOpenClaimEditor(true);
    };
    const handleEditClaim = () => {
        setOpenClaimEditor(true);
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
                        <ClaimFilters />
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
                            <Her href={'claims/editor&claim=0'}>
                            <Button>
                            Создать заявку
                            </Button>
                        </Her>
                    </div>
                    
                    <div className={'mi-mt-12'}>
                        <div className={'mi-content-stack'}>
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                            <ClaimCard25 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default ClaimListPage;
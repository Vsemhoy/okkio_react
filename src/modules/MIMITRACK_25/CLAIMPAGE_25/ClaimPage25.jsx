import React, { useContext } from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";
import BreadCrumbBox from "../../../Components/MimiTemplate/components/BREADCRUMBS/BreadCrumbBox";

const ClaimPage = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;



    return (
        <div className={"mi-ska-mw-1400"}>
            <MenuBox />
            <br/>
        <BreadCrumbBox></BreadCrumbBox>
            ClaimPage
        </div>
    )
};

export default ClaimPage;
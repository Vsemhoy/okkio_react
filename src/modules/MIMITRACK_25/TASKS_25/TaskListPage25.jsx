import React from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";


const TaskListPage = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;


    
    return (
        <div className={"mi-ska-mw-1400"}>
            <MenuBox />
            <br/>

            <BreadCrumbBox></BreadCrumbBox>
            TaskListPage
        </div>
    )
};

export default TaskListPage;
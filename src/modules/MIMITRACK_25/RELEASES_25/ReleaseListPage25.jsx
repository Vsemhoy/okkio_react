import React, { useContext } from "react";
import { StateContext, StateProvider } from "../../../Components/ComStateProvider25/ComStateProvider25";
import MenuBox from "../../../Components/MimiTemplate/components/MENUBOX/MenuBox";
import BreadCrumbBox from "../../../Components/MimiTemplate/components/BREADCRUMBS/BreadCrumbBox";
import './components/style/releasepage25.css';
import { Radio, Select } from "antd";

const ReleaseListPage = (props) => {
    const {state, setState} = useContext(StateContext);
    const {userData} = props;


    
const options = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', title: 'Orange', className: 'label-3' },
];


    return (
        <div className={'mi-page-wrapper'}>
            <div className={"mi-ska-mw-1400"}>
                
                <br/>
            <BreadCrumbBox></BreadCrumbBox>
                
            </div>
                <br/>


            <div className={"mi-ska-mw-1400"}>
                <div className={'mi-releasee-toolbar mi-bg-base'}>
                    <Select
                        placeholder={'Project'}
                    />
                    
                    <Select
                        placeholder={'Claimer'}
                    />
                    <Radio.Group options={options}
                    //  onChange={0}
                      value={'0'}
                      optionType="button" />



                    <Select
                        placeholder={'Year'}
                    />
                    <Select
                        placeholder={'Month'}
                    />

                    <Select
                        placeholder={'Planned'}
                    />
                </div>

            <div className={'mi-release-stack'}>
                <div
                    className={'mi-release-stack-divider'}
                >7 Мая 2025</div>

                <div className={'mi-release-stack-card-wrapper'}>
                    <div className={'mi-release-stack-card'}>
                        <div className={'mi-release-headrow mi-flex'}>
                            <div>
                                #6567
                            </div>
                            <div>
                                Версия 0.0.2
                            </div>
                        </div>
                        <div className={'mi-release-bodyrow'}>
                            dfdasdf asdf
                            asdf as
                            dfdasdfasd
                            falseasd
                        </div>

                    </div>

                </div>

            </div>

            </div>
        </div>
    )
};

export default ReleaseListPage;
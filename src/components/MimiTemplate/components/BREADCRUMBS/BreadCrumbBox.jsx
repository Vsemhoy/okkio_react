import React, { useContext } from 'react';
import { StateContext } from '../../../ComStateProvider25/ComStateProvider25';
import BreadCrumber from '../../../HybridEmbeddedRouter/BreadCrumber';
import './style/mibreads.css';

const BreadCrumbBox = (props) => {
  const { state, setState } = useContext(StateContext);

  return (
    <div className={'mi-container'}>
      <div className={'mi-flex-space mi-pa-3'}>
        <div className={'mi-flex mi-bread-crumbs'}>
          <BreadCrumber />
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbBox;
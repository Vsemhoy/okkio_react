import React, { useContext, useEffect } from 'react';

import './statebar25.css';
import { StateContext } from '../../../ComStateProvider25/ComStateProvider25';

const StateBar25 = (props) => {
    const { activeTask, setActiveTaskItem } = useContext(StateContext);
    useEffect(() => {
      console.log('activeTask', activeTask)
    }, [activeTask]);

  return (
    <>
    { activeTask && (
        <div className={'mi-state-bar'}>
            <div className={'mi-flex-space'}>
                <div>{activeTask.id}</div>
                <div>{activeTask.title}</div>
            </div>
        </div>

    )}
        
    </>
  );
};

export default StateBar25;
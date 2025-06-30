import React, { useEffect, useState } from 'react';
import './style/flowdayheadrow.css';
import { Affix } from 'antd';
import { getMonthColor } from '../../../../utils/Text/DateUtils';

const  FlowDayHeadRow = (props) => {

    const [date, setdate] = useState(props.date);

    useEffect(() => {
        setdate(props.date);
    }, [props.date]);


  return (
    <Affix >

        <div className={'flow-date-head-row-wrapper'}
            style={{'backgroundColor': getMonthColor(date.month())}}
        >
        <div className={'flow-date-head-row'}>
            <div>
                {date.format('MM-YYYY')}
            </div>
            <div>
                Hello
            </div>
        </div>
        </div>
    </Affix>
  );
};

export default FlowDayHeadRow;
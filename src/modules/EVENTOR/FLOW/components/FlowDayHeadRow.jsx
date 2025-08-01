import React, { useEffect, useState } from 'react';
import './style/flowdayheadrow.css';
import { Affix } from 'antd';
import { getMonthColor } from '../../../../utils/Text/DateUtils';
import { GetMonthName } from '../../../../locals/Lists/MonthNameLocals';

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
            <div className={'flow-date-header'}>
                {GetMonthName(date.month() + 1, 'en')} {date.format('YYYY')}
            </div>
            <div>
                {props.container}
            </div>
        </div>
        </div>
    </Affix>
  );
};

export default FlowDayHeadRow;
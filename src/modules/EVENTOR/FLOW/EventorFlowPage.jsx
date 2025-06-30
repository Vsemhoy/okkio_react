import React, { useEffect, useState } from 'react';
import DevSideNavMt from '../../../components/MimiTemplate/components/DEVSIDENAV/DevSidenavMt';
import { Button, DatePicker, Input, Modal, Switch } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import FlowDateRow from './components/FlowDateRow';
import FlowDayHeadRow from './components/FlowDayHeadRow';
import EventEditorCom from '../EVEDITOR/EventEditorCom';


const EventorFlowPage = ({user_data, user_state}) => {
    const [startMonth, setstartMonth] = useState(dayjs().startOf('month'));
    const [endMonth, setEndMonth] = useState(dayjs().endOf('month'));

    const [openModalEditor, setOpenModalEditor] = useState(false);
    const [openModalView, setOpenModalView] = useState(false);
    // const [openModalEditor, setOpenModalEditor] = useState(false);


    const [dateArray, setDateArray] = useState([]);
    const [calendarDirection, setCalendarDirection] = useState(true);

    const [preHidden, setPreHidden] = useState(false);

    useEffect(() => {
        setPreHidden(true);
        setTimeout(() => {
            setPreHidden(false);
        }, 1300);
    }, [startMonth, endMonth, calendarDirection]);


    const handleChangeTargetMonths = (dates)=>{
        if (!dates){
               setstartMonth(dayjs().startOf('month'));
     
            setEndMonth(dayjs().endOf('month'));
            return;
        }
        setstartMonth(dates[0].startOf('month'));
        setEndMonth(dates[1].endOf('month'));
    };
    const handleMoveMonth = (value)=>{
        if (value > 0){
            setstartMonth(startMonth.add(1, 'month').startOf('month'));
            setEndMonth(endMonth.add(1, 'month').endOf('month'));
        } else {
            setstartMonth(startMonth.add(-1, 'month').startOf('month'));
            setEndMonth(endMonth.add(-1, 'month').endOf('month'));
        }
    }
    const handleExpandMonth = (value) => {
        if (value > 0){
            setEndMonth(endMonth.add(1, 'month').endOf('month'));
        } else {
            setstartMonth(startMonth.add(-1, 'month').startOf('month'));
        }
    }


    useEffect(() => {
        if (startMonth == null){
          
            setstartMonth(dayjs().startOf('month'));
        };        if (endMonth == null){
            setEndMonth(dayjs().endOf('month'));
        }      
      let newDates = [];
      let max = 1120;

      setTimeout(() => {
          
          if (calendarDirection == true){
              let currentDate = startMonth.clone();
              let lastMonth = currentDate.month();
                newDates.push({type: 'dayheader', date: currentDate.clone(currentDate.clone())});
              while (currentDate.format('YYYY-MM-DD') != endMonth.format('YYYY-MM-DD')){
                  newDates.push({type: 'day', date: currentDate.clone(currentDate.clone())});
                  currentDate = currentDate.add(1,'day');
                  if (currentDate.month() != lastMonth){
                    newDates.push({type: 'dayheader', date: currentDate.clone(currentDate.clone())});
                    lastMonth = currentDate.month();
                  }
    
                  max--;
                  if (max < 0){
                      break;
                  }
                }
                newDates.push({type: 'day', date: currentDate.clone(currentDate.clone())});
          } else {
                let currentDate = endMonth.clone();
              let lastMonth = currentDate.month();
                    newDates.push({type: 'dayheader', date: currentDate.clone(currentDate.clone())});
              while (currentDate.format('YYYY-MM-DD') != startMonth.format('YYYY-MM-DD')){
                  newDates.push({type: 'day', date: currentDate.clone(currentDate.clone())});
                  currentDate = currentDate.subtract(1,'day');
                  if (currentDate.month() != lastMonth){
                    newDates.push({type: 'dayheader', date: currentDate.clone(currentDate.clone())});
                    lastMonth = currentDate.month();
                  }
    
                  max--;
                  if (max < 0){
                      break;
                  }
                }
                newDates.push({type: 'day', date: currentDate.clone(currentDate.clone())});
          }
          // console.log('newDates', newDates)
          setDateArray(newDates);
      }, 300);


    }, [startMonth, endMonth, calendarDirection]);

    const handleOpenView = (date, id) => {
        
    }

    const handleOpenEditor = (date, id) => {
        setOpenModalEditor(true);
    }

    const handleCloseEditor = (date, id) => {

    }


  return (
     <div className={`mi-page-layout ${user_state?.role == 'developer' ? 'mi-layout-dev' : 'mi-layout-client'}`}
        
        >
        {user_state?.role == 'developer' && (
            <DevSideNavMt />
        )}
        <div className={'mi-layout-body'}><div className={'mi-page-wrapper'}>
            <div className={"mi-ska-mw-1900"}>
                    
                    <div className={'mi-pa-12'}>
                        <div className={"mi-flex-space"}>
                            <div>A</div>
                            <div className={'mi-flex  mi-grid-gap-6'}>
                                <Button
                                size='small'
                                icon={<DoubleLeftOutlined />}
                                    onClick={()=>{handleExpandMonth(-1)}}
                                />
                                <Button
                                onClick={()=>{handleMoveMonth(-1)}}
                                size='small'
                                icon={<LeftOutlined />}

                                />

                                <DatePicker.RangePicker 
                                    picker='month'
                                    size='small'
                                    value={[startMonth, endMonth]}
                                    onChange={handleChangeTargetMonths}
                                    />

                                <Button
                                size='small'
                                icon={<RightOutlined />}
                                    onClick={()=>{handleMoveMonth(1)}}
                                />
                                <Button
                                size='small'
                                icon={<DoubleRightOutlined />}
                                    onClick={()=>{handleExpandMonth(1)}}
                                />
                            </div>
                            <div><Switch checkedChildren="PAST" unCheckedChildren="FUTURE" defaultChecked 
                                checked={calendarDirection}
                                onChange={(ev)=>{setCalendarDirection(ev)}}
                            /></div>
                        </div>
                    </div>
                    <div className={"mi-pa-12"}>
                        {/* {startMonth.format('YYYY-MM-DD')} */}
                        <div className={`scroll-container  hidden-control ${preHidden ?  'pre-hidden': 'no-hidden'}`}>
                            {dateArray.map((dateg, index)=>(
                                <>
                                    {dateg.type === 'day' && (
                                        <FlowDateRow date={dateg.date} 
                                            key={`dayrow_${dateg.date.format('YYYY-MM-DD')}`}
                                            open_editor={openModalEditor}
                                            open_view={openModalView}
                                            on_open_editor={handleOpenEditor}
                                            on_close_editor={handleCloseEditor}
                                            on_open_view={handleOpenView}
                                        />
                                    )}
                                    {dateg.type === 'dayheader' && (
                                        <FlowDayHeadRow date={dateg.date} 
                                            key={`daymonthrow_${dateg.date.format('YYYY-MM-DD')}`}
                                        />
                                    )}
                                </>
                            ))}
                        </div>
                        <div className={`scroll-container-loader ${preHidden ?  'pre-loader': 'no-loader'}`}>
                            <h1><LoadingOutlined /></h1>
                        </div>
                    </div>

                    <div className={`mi-pa-12 hidden-control ${preHidden ?  'pre-hidden': 'no-hidden'}`}>
                        <div className={"mi-flex-space"}>
                            <div>A</div>
                            <div className={'mi-flex  mi-grid-gap-6'}>
                                <Button
                                size='small'
                                icon={<DoubleLeftOutlined />}
                                    onClick={()=>{handleExpandMonth(-1)}}
                                />
                                <Button
                                onClick={()=>{handleMoveMonth(-1)}}
                                size='small'
                                icon={<LeftOutlined />}

                                />

                                <DatePicker.RangePicker 
                                    picker='month'
                                    size='small'
                                    value={[startMonth, endMonth]}
                                    onChange={handleChangeTargetMonths}
                                    
                                    />

                                <Button
                                size='small'
                                icon={<RightOutlined />}
                                    onClick={()=>{handleMoveMonth(1)}}
                                />
                                <Button
                                size='small'
                                icon={<DoubleRightOutlined />}
                                    onClick={()=>{handleExpandMonth(1)}}
                                />
                            </div>
                            <div><Switch checkedChildren="PAST" unCheckedChildren="FUTURE" defaultChecked 
                                checked={calendarDirection}
                                onChange={(ev)=>{setCalendarDirection(ev)}}
                            /></div>
                        </div>
                    </div>
                    <div className={'height-filler'}>

                    </div>
                </div>
            </div>
        </div>



      <br />
      <br />

 
        <EventEditorCom
            open={openModalEditor}
            onOk={() => setOpenModalEditor(false)}
            onCancel={() => setOpenModalEditor(false)}
        />


    </div>
  );
};

export default EventorFlowPage;
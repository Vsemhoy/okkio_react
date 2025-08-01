import React, { useEffect, useState } from 'react';
import DevSideNavMt from '../../../components/MimiTemplate/components/DEVSIDENAV/DevSidenavMt';
import { Button, DatePicker, Input, Modal, Switch } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined, DownSquareOutlined, LeftOutlined, LoadingOutlined, RightOutlined, UpSquareOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import FlowDateRow from './components/FlowDateRow';
import FlowDayHeadRow from './components/FlowDayHeadRow';
import EventEditorCom from '../EVEDITOR/EventEditorCom';
import { useEventorStorage } from '../../../storage/localstorage/EventorStaorage';
import { PROD_AXIOS_INSTANCE } from '../../../API/API';
import './components/style/eventor.css';

import Cookies from "js-cookie";

const EventorFlowPage = ({user_data, user_state, on_callback, layout_change_callback}) => {

  const { 
    events,
    addEvent,
    getEvents,
    removeEvent,
    
    addSection,
    getSection,
    getSections,
    removeSection,
    updateSection,
  } = useEventorStorage();

    const [startMonth, setstartMonth] = useState(dayjs().startOf('month'));
    const [endMonth, setEndMonth] = useState(dayjs().endOf('month'));

    const [openModalEditor, setOpenModalEditor] = useState(false);
    const [openModalEditorData, setOpenModalEditorData] = useState(null);
    const [openModalView, setOpenModalView] = useState(false);
    // const [openModalEditor, setOpenModalEditor] = useState(false);


    const [dateArray, setDateArray] = useState([]);
    const [calendarDirection, setCalendarDirection] = useState(Cookies.get('ev_calendar_direction') !== undefined ? Cookies.get('ev_calendar_direction') : 'DESC');

    const [preHidden, setPreHidden] = useState(false);

    const [baseEvents, setBaseEvents] = useState([]);
    const [baseSections, setBaseSections] = useState([]);

    const [sidenavSections, setSidenavSections] = useState([]);

    const [localEvents, setLocalEvents] = useState([]);
    const [editedEvent, setEditedEvent] = useState(null);

    const [selectedSection, setSelectedSection] = useState(useState(Cookies.get('ev_calendar_section') !== undefined ? Cookies.get('ev_calendar_section') : 'NULL'));

    // useEffect(() => {
    //     console.log('caldir', Cookies.get('ev_calendar_direction'))
    //     setCalendarDirection(Cookies.get('ev_calendar_direction') !== undefined ? Cookies.get('ev_calendar_direction') : true);
    //     // loadEventsAction(startMonth, endMonth, null);
    // }, []);






    const loadSectionsAction = async () => {
        let loadedFromServer = false;
            try {
            const response = await PROD_AXIOS_INSTANCE.post('/eventor/getmysections', 
            {

            }, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            });
            
            let prevSections = getSections();
            
            console.log('prevSections', prevSections);
            for (let i = 0; i < prevSections.length; i++) {
                console.log(prevSections[i]);
                if (!prevSections[i].syncStatus && !prevSections[i].id.includes('temp_')){
                    removeSection(prevSections[i].id);
                };
            };

            const data = response.data.content;
            for (let i = 0; i < data.length; i++) {
                addSection(data[i].id, data[i]);
            }
            setBaseSections(data);
            loadedFromServer = true;
        } catch (error) {
            console.error('Sync failed:', error);
        }

        if (!loadedFromServer){
            setBaseSections(getSections());
        }
        setTimeout(() => {
            setPreHidden(false);
        }, 700);

    }



    const loadEventsAction = async (start, end, section) => {
        let loadedFromServer = false;
        setPreHidden(true);
        try {
            const response = await PROD_AXIOS_INSTANCE.post('/eventor/getmyevents', 
            {
                start: start,
                end: end,
                sections: [section]
            }, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('jwt')
                }
            });
            
            let prevEvents = getEvents(start, end, section);
            
            console.log('prevEvents', prevEvents);
            for (let i = 0; i < prevEvents.length; i++) {
                console.log(prevEvents[i]);
                if (!prevEvents[i].syncStatus && !prevEvents[i].id.includes('temp_')){
                    removeEvent(prevEvents[i].id);
                };
            };

            const data = response.data.content;
            for (let i = 0; i < data.length; i++) {
                addEvent(data[i].id, data[i]);
            }
            setBaseEvents(data);
            loadedFromServer = true;
        } catch (error) {
            console.error('Sync failed:', error);
        }

        if (!loadedFromServer){
            setBaseEvents(getEvents());
        }
        setTimeout(() => {
            setPreHidden(false);
        }, 700);
    }


    useEffect(() => {
        let a =  baseSections?.map((item)=>(
            { 
                key: "sect_" + item.id ,
                label: item.name,
                id: item.id
            }
        ));
        if (!a){ a = []};
        a?.unshift({ key: 'sect_all', label: 'All sections', id: 'ALL'});
        a?.unshift({ key: 'no_sect', label: 'No section', id: 'NULL'});
        setSidenavSections(a);
    }, [baseSections]);

    const handleUpdateEvents = (ids)=> {
        console.log('ids', ids)
        console.log('getEvents()', getEvents());
        setBaseEvents(getEvents());
    }

    useEffect(() => {
      console.log('baseEvents', baseEvents)
      setLocalEvents(baseEvents.filter((item)=> dayjs(item.setdate).isAfter(startMonth) && dayjs(item.setdate).isBefore(endMonth)));
    }, [baseEvents]);


    useEffect(() => {
        Cookies.set('ev_calendar_direction', calendarDirection);
        setPreHidden(true);
        // setBaseEvents(getEvents());
        loadSectionsAction();
        loadEventsAction(startMonth, endMonth, selectedSection);
        setTimeout(() => {
            setPreHidden(false);
        }, 700);
    }, [startMonth, endMonth, calendarDirection, selectedSection]);


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


          console.log('calendarDirection 2', calendarDirection)
          if (calendarDirection === 'ASC'){
              let currentDate = startMonth.clone();
              let lastMonth = currentDate.month();
                newDates.push({type: 'dayheader', date: currentDate.clone(currentDate.clone())});
              while (currentDate.format('YYYY-MM-DD') !== endMonth.format('YYYY-MM-DD')){
                    console.log('currentDate', currentDate)
                  newDates.push({type: 'day', date: currentDate.clone(currentDate.clone())});
                  currentDate = currentDate.add(1,'day');
                  if (currentDate.month() !== lastMonth){
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
              while (currentDate.format('YYYY-MM-DD') !== startMonth.format('YYYY-MM-DD')){
                  newDates.push({type: 'day', date: currentDate.clone(currentDate.clone())});
                  currentDate = currentDate.subtract(1,'day');
                  if (currentDate.month() !== lastMonth){
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



    }, [startMonth, endMonth, calendarDirection]);





    const handleOpenView = (date, id) => {
        
    }

    const handleOpenEditor = (date, section, id) => {
        setOpenModalEditor(true);
        setEditedEvent({id: null, date: date, section_id: section});
    }

    const handleCloseEditor = (date, id) => {

    }

    const handleClickToChangeEvent = (id) => {

        setEditedEvent({id: id});
        setOpenModalEditor(true);
    }


    const handleChangeSection = (value) => {
        console.log('value', value)
        setSelectedSection(value);
        Cookies.set('ev_calendar_section', value);
    }


    const handleTriggerSidenav = (val) => {
        if (layout_change_callback){
            layout_change_callback(val);
        }
        console.log('val', val)
    }


  return (
     <div className={`mi-page-layout mi-layout-devsider`}
        
        >
        
            <DevSideNavMt 
                title="Sections" 
                selected=""
                items={sidenavSections}
                on_callback={on_callback}
                on_change_item={handleChangeSection}
                active_item={selectedSection}
                layout_change_callback={handleTriggerSidenav}
            />
        
        <div className={'mi-layout-body'}><div className={'mi-page-wrapper'}>
            <div className={"mi-ska-mw-1900"}>
                    
                    <div className={'mi-pa-12'}>
                        <div className={"mi-flex-space mi-control-flat-row"}>
                            <div>{calendarDirection ? '' : ''}</div>
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
                                    className={'narrow-range-picker'}
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
                            <div>

                            {calendarDirection === 'DESC' ? (
                                <div 
                                onClick={()=>{setCalendarDirection('ASC')}}
                                className={'evt-calendar-direction-switch'}
                                    title='From past to future'
                                ><DownSquareOutlined /></div>
                            ):(
                               <div
                                onClick={()=>{setCalendarDirection('DESC')}}
                                className={'evt-calendar-direction-switch'}
                                    title='From future to past'
                                    ><UpSquareOutlined /></div>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className={"adaptive-layout"}>
                        {/* {startMonth.format('YYYY-MM-DD')} */}
                        <div className={`scroll-container  hidden-control ${preHidden ?  'pre-hidden': 'no-hidden'}`}
                            key={"jfaklsjdf9043285"}
                        >
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
                                            events={localEvents.filter((item)=> dayjs(item.setdate).isSame(dateg.date, 'd') )}
                                            on_change_trigger={handleClickToChangeEvent}
                                            active_section={selectedSection}
                                        />
                                    )}
                                    {dateg.type === 'dayheader' && (
                                        <FlowDayHeadRow date={dateg.date} 
                                            key={`daymonthrow_${dateg.date.format('YYYY-MM-DD')}`}
                                            container={sidenavSections.find((item)=>item.id === selectedSection)?.label}
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
                            <div>

                            {calendarDirection ? (
                                <div 
                                onClick={()=>{setCalendarDirection(false)}}
                                className={'evt-calendar-direction-switch'}
                                    title='From past to future'
                                ><DownSquareOutlined /></div>
                            ):(
                               <div
                                onClick={()=>{setCalendarDirection(true)}}
                                className={'evt-calendar-direction-switch'}
                                    title='From future to past'
                                    ><UpSquareOutlined /></div>
                            )}
                            </div>
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
            className={'narrow-range-picker'}
            open={openModalEditor}
            onOk={() => setOpenModalEditor(false)}
            onCancel={() => setOpenModalEditor(false)}
            data={editedEvent}
            on_change={handleUpdateEvents}
            sections={baseSections}
        />


    </div>
  );
};

export default EventorFlowPage;
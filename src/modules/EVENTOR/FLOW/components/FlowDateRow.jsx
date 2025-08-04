import React, { useEffect, useState, useRef } from 'react';
import './style/flowdaterow.css';
import EventorFlowDayCard from './EventorFlowDayCard';
import { Affix } from 'antd';
import dayjs from 'dayjs';
import { GetMonthName } from '../../../../locals/Lists/MonthNameLocals';
import { GetDayName } from '../../../../locals/Lists/WeekDayNameLocals';

const FlowDateRow = (props) => {
    const containerRef = useRef(null);
    const [date, setDate] = useState(props.date);
    const [eventStack, setEventStack] = useState([]);
    const [affixReady, setAffixReady] = useState(false);

    const [isToday, setIsToday] = useState(false);
    const [preHidden, setPreHidden] = useState(false);



    useEffect(() => {
        setDate(props.date);
        setIsToday(date.format('DD-MM-YYYY') === dayjs().format('DD-MM-YYYY'));
    }, [props.date]);

    useEffect(() => {
      if (props.events){
        setEventStack(props.events);
      }
    }, [props.events]);

    useEffect(() => {
        // Даём время на монтирование DOM
        const timer = setTimeout(() => {
            setAffixReady(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const handleDblClick = (ev) => {
        if (!ev.target.closest('.eventor-flow-daycard')) {
            // let newobj = { date: date };
            // setEventStack([newobj, ...eventStack]);
            console.log('props.active_section', props.active_section)
            if (props.on_open_editor){
                props.on_open_editor(date.hour(dayjs().hour())
                    .minute(dayjs().minute())
                    .second(dayjs().second())
                    .millisecond(dayjs().millisecond()), 
                    props.active_section
                    , null);
            }
        }
    }

    useEffect(() => {
        setPreHidden(true);
        setTimeout(() => {
            setPreHidden(false);
        }, 1300);
    }, [date]);

    return (
        <div className={`flow-date-row-wrapper hidden-control ${preHidden ?  'pre-hiddens': ''}`}>
            <div className={`flow-date-row ${isToday ? 'today' : ''} ${date.day() === 0 || date.day() === 6 ? "weekend" : ""}`}
                id={isToday ? 'today_row' : ''}
            >
                <div
                    className='scrollable-container'
                    ref={containerRef}
                    onDoubleClick={handleDblClick}
                    style={{
                        position: 'relative',  // Важно!
                        overflowY: 'auto',    // Важно!
                        height: '100%'        // Нужна фиксированная высота
                    }}
                >
                    {affixReady && containerRef.current && (
                        <Affix
                            position={'bottom'}
                            target={() => containerRef.current}
                            offsetTop={0}
                        >
                            <div className='flow-date-cell'>
                                <div title={GetDayName(date.day(), 'en', false)}>
                                    {GetDayName(date.day(), 'en', true)} {date.format('DD')}

                                </div>
                            </div>
                        </Affix>
                    )}
                </div>
                <div
                    className={'ev-flow-row-event-stack mi-grid-gap-12'}
                    onDoubleClick={handleDblClick}
                >
                    {eventStack.map((eve, index) => (
                        <EventorFlowDayCard
                            key={'evecat' + eve.id}
                            date={eve.setdate}
                            data={eve}
                            on_change_trigger={props.on_change_trigger}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlowDateRow;
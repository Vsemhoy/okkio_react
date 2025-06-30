import React, { useEffect, useState, useRef } from 'react';
import './style/flowdaterow.css';
import EventorFlowDayCard from './EventorFlowDayCard';
import { Affix } from 'antd';
import dayjs from 'dayjs';

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
        // Даём время на монтирование DOM
        const timer = setTimeout(() => {
            setAffixReady(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const handleDblClick = (ev) => {
        if (!ev.target.closest('.eventor-flow-daycard')) {
            let newobj = { date: date };
            setEventStack([newobj, ...eventStack]);
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
            <div className={`flow-date-row ${isToday ? 'today' : ''}`}>
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
                            <div style={{  background: '#fff' }}>
                                {date.format('DD-MM')}
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
                            key={index}
                            date={eve.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlowDateRow;
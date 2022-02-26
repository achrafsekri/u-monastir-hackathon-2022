import React, { useState, useEffect } from 'react';
import MiddlePanel from './middle_panel/MiddlePanel';
import RightPanel from './right_panel/RightPanel';

const Dashboard = () => {

    const [date, setDate] = useState(new Date());

    const [attendances, setAttendances] = useState({
        general: {
            total: 7020,
            today: {
                total: 6825,
                boys: 4095,
                girls: 2730,
                absence: 195
            },
            previous: {
                total: 6825,
                boys: 4095,
                girls: 2730,
                absence: 195
            }
        },
        days: [
            {   
                day: ['26', 'Jan'],
                attendance: 6000
            }, 
            {
                day: ['27', 'Jan'],
                attendance: 4200
            }, 
            {
                day: ['28', 'Jan'],
                attendance: 5000
            }, 
            {
                day: ['29', 'Jan'],
                attendance: 4200
            }, 
            {
                day: ['30', 'Jan'],
                attendance: 6000
            }, 
            {
                day: ['31', 'Jan'],
                attendance: 5100
            }, 
            {
                day: ['01', 'Feb'],
                attendance: 6300
            }, 
            {
                day: ['02', 'Feb'],
                attendance: 6800
            }, 
            {
                day: ['03', 'Feb'],
                attendance: 5700
            }, 
            {
                day: ['04', 'Feb'],
                attendance: 6700
            }, 
            {
                day: ['05', 'Feb'],
                attendance: 7000
            }, 
            {
                day: ['06', 'Feb'],
                attendance: 5600
            },
            {
                day: ['07', 'Feb'],
                attendance: 6000
            }
        ],
        classes: [{
            class: 'Nursery',
            attendance: 254
        },
        {
            class: 'Class I',
            attendance: 689
        },
        {
            class: 'Class II',
            attendance: 912
        },
        {
            class: 'Class III',
            attendance: 988
        },
        {
            class: 'Class IV',
            attendance: 650
        },
        {
            class: 'Class V',
            attendance: 908
        },
        {
            class: 'Class VI',
            attendance: 300
        },
        {
            class: 'Class VII',
            attendance: 806
        },
        {
            class: 'Class VIII',
            attendance: 188
        },
        {
            class: 'Class IX',
            attendance: 835
        },
        {
            class: 'Class X',
            attendance: 940
        }]
    });

    useEffect(() => {
        // fetch data
        async function load() {
            const data = await fetch();
        }
        load();
    },[date]);

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <MiddlePanel attendances={attendances}/>
            <RightPanel value={date} onChange={setDate}/>
        </div>
    );
}
 
export default Dashboard;
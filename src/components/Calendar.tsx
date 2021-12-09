import { useState, useEffect } from 'react';


const months = [
    ['Enero', 'ENE', 31], ['Febrero', 'FEB', 28], ['Marzo', 'MAR', 31], ['Abril', 'ABR', 30],
    ['Mayo', 'MAY', 31], ['Junio', 'JUN', 30], ['Julio', 'JUL', 31], ['Agosto', 'AGO', 31],
    ['Septiembre', 'SEP', 30], ['Octubre', 'OCT', 31], ['Noviembre', 'NOV', 30], ['Diciembre', 'DIC', 31]
];

const days = [
    ['Lunes', 'LUN', 'Monday'], ['Martes', 'MAR', 'Tuesday'], ['Miércoles', 'MIE', 'Wednesday'],
    ['Jueves', 'JUE', 'Thursday'], ['Viernes', 'VIE', 'Friday'], ['Sábado', 'SAB', 'Saturday'],
    ['Domingo', 'DOM', 'Sunday']
]

const hours = [
    '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
]

const Calendar = ({ user, ClassDay }) => {

    const date = new Date();

    const [monthNumber, setMonthNumber] = useState(date.getMonth());
    const [month, setMonth] = useState(months[monthNumber]);
    const [day, setDay] = useState(date.getDay() - 1);
    const [today, setToday] = useState(date.getDate());

    const GetDay = ({ i }) => {
        let num;

        if (day === i)
            num = today;
        else {
            num = today + i - day;
            if (num < 1)
                num += months[monthNumber - 1][2];
            if (num > month[2])
                num -= month[2];
        }

        return <span className="day">{num}</span>
    }

    return <>
        <table className="calendar">
            <thead>
                <tr>
                    <th>
                        <span className="long">{month[0]}</span>
                        <span className="short">{month[1]}</span>
                    </th>
                    {days.map((day, i) => {
                        return (
                            <th key={i}>
                                <GetDay i={i} />
                                <span className="long">{day[0]}</span>
                                <span className="short">{day[1]}</span>
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {hours.map((hour, i) => {
                    return (
                        <tr key={i}>
                            <td className="hour">{hour}</td>
                            {days.map((day, j) => {
                                return (
                                    <ClassDay 
                                        key={j} 
                                        i={i} 
                                        j={j} 
                                        day={day} 
                                        hour={hour.split(':')[0]} 
                                    />
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
}

export default Calendar

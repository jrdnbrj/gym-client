import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from 'react-redux';

import weekScheduleAllMutation from '../graphql/weekScheduleAllQuery';
import userByIDQuery from '../graphql/userByIDQuery';
import bookClassMutation from '../graphql/bookClassMutation';

import Modal from "../components/Modal";
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';


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

const Calendar = () => {

    const { loading, error, data, refetch } = useQuery(weekScheduleAllMutation);

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        setSchedules(data?.weekScheduleAll);
    }, [data])

    const user = useSelector(state => state.user.user);

    const [getInstructor, { loading: loadingUser, data: dataUser, error: dataError }] = useLazyQuery(userByIDQuery);

    const date = new Date();

    const [showModal, setShowModal] = useState(false);

    const [monthNumber, setMonthNumber] = useState(date.getMonth());
    const [month, setMonth] = useState(months[monthNumber]);
    const [day, setDay] = useState(date.getDay() - 1);
    const [today, setToday] = useState(date.getDate());
    const [busyModal, setBusyModal] = useState(false);

    const [classInfo, setClassInfo] = useState({
        quotas: 0,
        startDate: '',
        scheduleDays: [],
        price: 100,
        scheduleID: 0
    });

    const openBusy = (userID, quotas, startDate, scheduleDates, scheduleID) => {
        setClassInfo({ ...classInfo, userID, quotas, startDate, scheduleDates, scheduleID });
        setBusyModal(true);
        getInstructor({ variables: { userID } });
        setShowModal(true)
    };

    const openAvailable = (userID, quotas, startDate, scheduleDates, scheduleID) => {
        setClassInfo({ ...classInfo, userID, quotas, startDate, scheduleDates, scheduleID });
        setBusyModal(false)
        getInstructor({ variables: { userID } });
        setShowModal(true)
    };

    const closeModal = () => setShowModal(false);

    const [bookClass, { loading: loadingBook }] = useMutation(
        bookClassMutation, {
            onCompleted: () => {
                refetch();
                setShowModal(false);
                alert('Clase reservada con éxito');
            },
            onError: (error) => {
                console.log(error);
                alert('Error al reservar clase');
            }
        } 
    );

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

    const bookClassSubmit = e => {
        e.preventDefault();
        console.log('booking');
        console.log('user.id:', user.id)
        bookClass({ 
            variables: { 
                clientID: user.clientID,
                weekScheduleID: classInfo.scheduleID,
            } 
        });
    }

    const bookClassComponent = () => {
        return <>
            <Form onSubmit={bookClassSubmit}>
                <Alert variant="info">
                    <p>Esta clase tiene {classInfo.quotas} cupos disponibles.</p>
                    <p>
                        <strong>Horarios: </strong>
                        {classInfo.startDate.split(':00 GMT')[0]}
                    </p>
                    <p>
                        <strong>Días de clases: </strong>
                        {classInfo.scheduleDates.join(', ')}
                    </p>
                    <p>
                        <strong>Precio Mensual: </strong>
                        $ {classInfo.price}
                    </p>
                </Alert>
                <Button className="mt-2" type="submit">Reservar</Button>
            </Form>
        </>
    }

    const viewClassComponent = () => {
        if (loadingUser)
            return <Spinner animation="border" variant="primary" />

        return <>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Instructor: </strong>
                    {dataUser?.userByID?.firstName}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Horarios: </strong>
                    {classInfo.startDate.split(':00 GMT')[0]}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Días de clases: </strong>
                    {classInfo.scheduleDates.join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Precio Mensual: </strong>
                    $ {classInfo.price}
                </ListGroup.Item>
            </ListGroup>
        </>
    }



    const ClassDay = ({ i, j, day, hour }) => {
        let busy = false;
        let available = false;
        let quotas = 0;
        let userID = '';
        let startDate = '';
        let scheduleDates = [];
        let scheduleID = '';
        let clientID = '';

        schedules?.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const schudelTime = new Date(schedule.startDate);
                const hourStart = schudelTime.getUTCHours().toString();

                if (hourStart === hour) {
                    const students = Array.from(schedule.students, student => student.userID);
                    if (students.includes(parseInt(user.id))) {
                        userID = schedule.instructor.userID;
                        busy = true;
                    } else {
                        available = true;
                    }
                    scheduleID = schedule.id;
                    quotas = schedule.quotas;
                    startDate = schudelTime.toUTCString();
                    scheduleDates = schedule.days;
                }
            }
        })

        if (busy) 
            return (
                <td className="busy">
                    <div 
                        onClick={() => 
                            openBusy(userID, quotas, startDate, scheduleDates, scheduleID)
                        }
                    >
                        <span>Clase</span>
                    </div>
                </td>
            )
        
        if (available)
            return (
                <td className="available">
                    <div 
                        onClick={() => 
                            openAvailable(userID, quotas, startDate, scheduleDates, scheduleID)
                        }
                    >
                        <span>{quotas}</span>
                    </div>
                </td>
            )

        return <td></td>
    }

    return (
        <>
            <Modal 
                show={showModal} 
                onHide={() => setShowModal(false)} 
                header={busyModal ? 'Reservar Clase de Gimnasia' : 'Clase de Gimnasia'}
                ModalBody={busyModal ? viewClassComponent : bookClassComponent}
            />
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
    )
}

export default Calendar;

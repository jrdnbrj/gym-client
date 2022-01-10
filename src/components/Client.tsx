import { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from 'react-redux';

import weekScheduleAddStudent from '../graphql/mutation/weekScheduleAddStudent';
import clientRemoveReservation from '../graphql/mutation/clientRemoveReservation';

import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Calendar from '../components/Calendar';
import Modal from "../components/Modal";


const Client = ({ classes, refetch }) => {

    const user = useSelector(state => state.user.user);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [busyModal, setBusyModal] = useState(false);
    const [classInfo, setClassInfo] = useState({
        quotas: 0,
        startDate: '',
        scheduleDays: [],
        price: 100,
        scheduleID: 0,
        type: '',
        instructor: '',
    });


    const [bookClass, { loading: loadingBook }] = useMutation(
        weekScheduleAddStudent, {
            onCompleted: () => {
                refetch();
                setShowModal(false);
            },
            onError: (error) => {
                console.log(error);
                alert('Error al reservar clase. Recarga la página e inténtalo de nuevo');
            }
        } 
    );

    const [removeReservation, { loading: loadingRemove }] = useMutation(
        clientRemoveReservation, {
            onCompleted: () => {
                refetch();
                setShowModal(false);
            },
            onError: (error) => {
                console.log(error);
                alert('Error eliminando la reserva. Recarga la página e inténtalo de nuevo');
            }
        }
    );

    const bookClassSubmit = e => {
        e.preventDefault();
        bookClass({ 
            variables: { 
                clientID: user.id,
                weekScheduleID: classInfo.scheduleID,
            } 
        });
    }

    const remove = () => removeReservation({ variables: { weekScheduleID: classInfo.scheduleID } });

    const bookClassComponent = () => {
        return <>
            <Form onSubmit={bookClassSubmit}>
                <Alert variant="info">
                    <p>Esta clase tiene {classInfo.quotas} cupos disponibles.</p>
                    <p>
                        <strong>Instructor: </strong>
                        {classInfo.instructor}
                    </p>
                    <p>
                        <strong>Horario: </strong>
                        {classInfo.startDate.split(' ')[4]}
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
                <Button className="mt-2" type="submit">
                    {loadingBook && 
                        <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                    Reservar
                </Button>
            </Form>
        </>
    }

    const viewClassComponent = () => {
        return <>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Instructor: </strong>
                    {classInfo.instructor}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Horario: </strong>
                    {classInfo.startDate.split(' ')[4]}
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
            <Button className="mt-2" onClick={remove}>
                {loadingRemove && 
                    <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                Eliminar Reserva
            </Button>
        </>
    }

    const openModal = (quotas, startDate, scheduleDates, scheduleID, type, busy, instructor) => {
        setClassInfo({ ...classInfo, quotas, startDate, scheduleDates, scheduleID, type, instructor });

        if (busy)
            setBusyModal(true);
        else
            setBusyModal(false);

        setModalTitle(`Clase de ${type}`);
        setShowModal(true)
    }

    const ClassDay = ({ day, hour }) => {
        let busy = false;
        let available = false;
        let unavailable = false;
        let quotas = 0;
        let instructor = '';
        let startDate = '';
        let scheduleDates = [];
        let scheduleID = '';
        let type = '';
        let typeEmoji = '';

        classes.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const scheduleTime = new Date(schedule.startDate);
                const hourStart = scheduleTime.getUTCHours().toString();

                if (hourStart === hour) {
                    const students = Array.from(schedule.students, student => student.id);

                    if (students.includes(user.id)) {
                        busy = true;
                    } else {
                        if (schedule.quotas === 0) unavailable = true;
                        else available = true;
                    }
                    instructor = schedule.instructor.firstName + 
                        " " + schedule.instructor.lastName;
                    scheduleID = schedule.id;
                    quotas = schedule.quotas;
                    startDate = scheduleTime.toUTCString();
                    scheduleDates = schedule.days;
                    type = schedule.workoutType.name;
                    typeEmoji = schedule.workoutType.emoji;
                }
            }
        })

        const variables = busy => {
            return openModal(
                quotas, startDate, 
                scheduleDates, scheduleID, 
                type, busy, instructor
            );
        }

        if (busy) 
            return (
                <td className="busy">
                    <div onClick={() => variables(true)}>
                        {typeEmoji}
                    </div>
                </td>
            )
        
        if (available)
            return (
                <td className="available">
                    <div onClick={() => variables(false)}>
                        {typeEmoji}
                    </div>
                </td>
            )

        if (unavailable)
            return (
                <td className="unavailable" title="No hay cupos.">
                    <div>
                        {typeEmoji}
                    </div>
                </td>
            )

        return <td />
    }

    return (
        <div className="mx-3">
            <Calendar ClassDay={ClassDay} /> 
            <Modal 
                show={showModal}
                onHide={() => setShowModal(false)} 
                header={modalTitle}
                ModalBody={busyModal ? viewClassComponent : bookClassComponent}
            />
        </div>  
    )
}


export default Client;

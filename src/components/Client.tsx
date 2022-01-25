import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import weekScheduleAddStudent from "../graphql/mutation/weekScheduleAddStudent";
import clientRemoveReservation from "../graphql/mutation/clientRemoveReservation";
import clientHasPaidForWeekSchedule from "../graphql/query/clientHasPaidForWeekSchedule";

import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Calendar from "../components/Calendar";
import Modal from "../components/Modal";


const days = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo"
}

const Client = ({ classes, refetchClasses, user }) => {

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [busyModal, setBusyModal] = useState(false);
    const [classInfo, setClassInfo] = useState({
        quotas: 0,
        startTime: "",
        scheduleDays: [],
        price: 0,
        scheduleID: 0,
        type: "",
        instructor: "",
    });

    const [clientHadPaid, { data: paidData, loading: loadingPaid }] = useLazyQuery(clientHasPaidForWeekSchedule);
    const [bookClass, { loading: loadingBook }] = useMutation(
        weekScheduleAddStudent, {
            onCompleted: () => {
                refetchClasses();
                setShowModal(false);
            },
            onError: (error) => {
                console.log(error);
                alert("Error al reservar clase. Recarga la página e inténtalo de nuevo");
            }
        } 
    );

    const [removeReservation, { loading: loadingRemove }] = useMutation(
        clientRemoveReservation, {
            onCompleted: () => {
                refetchClasses();
                setShowModal(false);
            },
            onError: (error) => {
                console.log(error);
                alert("Error eliminando la reserva. Recarga la página e inténtalo de nuevo");
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

    const getTime = startTime => {
        return startTime < 10 ? `0${startTime}:00` : `${startTime}:00`;
    }

    const getDays = scheduleDates => {
        return scheduleDates
            .map(day => days[day])
            .join(", ");
    }

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
                        <Badge bg="secondary">{getTime(classInfo.startTime)}</Badge>{" "}
                        {getDays(classInfo.scheduleDates)}{"."}
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
            {paidData?.clientHasPaidForWeekSchedule && !loadingPaid &&
                <Badge pill bg="success">
                    pagado
                    <i className="bi bi-check-lg ms-1" />
                </Badge>
            }
            <ListGroup className="mt-1">
                <ListGroup.Item>
                    <strong>Instructor: </strong>
                    {classInfo.instructor}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Horario: </strong>
                    <Badge bg="secondary">{getTime(classInfo.startTime)}</Badge>{" "}
                    {getDays(classInfo.scheduleDates)}{"."}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Precio Mensual: </strong>
                    $ {classInfo.price}
                </ListGroup.Item>
            </ListGroup>
            {!paidData?.clientHasPaidForWeekSchedule && !loadingPaid &&
                <Button className="mt-2" onClick={remove}>
                    {loadingRemove && 
                        <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                    Eliminar Reserva
                </Button>
            }
        </>
    }

    const openModal = (
        quotas, startTime, scheduleDates, scheduleID, 
        type, busy, instructor, price
    ) => {
        clientHadPaid({ variables: { clientID: user.id, weekScheduleID: scheduleID } });
        setClassInfo({ 
            ...classInfo, quotas, startTime, scheduleDates, 
            scheduleID, type, instructor, price
        });

        if (busy) setBusyModal(true);
        else setBusyModal(false);

        setModalTitle(`Clase de ${type}`);
        setShowModal(true)
    }

    const ClassDay = ({ day, hour }) => {
        let busy = false;
        let available = false;
        let unavailable = false;
        let quotas = 0;
        let instructor = "";
        let startTime = "";
        let scheduleDates = [];
        let scheduleID = "";
        let type = "";
        let typeEmoji = "";
        let price = 0;

        classes?.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const scheduleTime = new Date(schedule.startDate);
                const hourStart = scheduleTime.getHours().toString();
                const classTime = hour < 10 ? hour.replace("0", "") : hour;

                if (hourStart === classTime) {
                    const students = Array.from(schedule.students, student => student.id);

                    instructor = schedule.instructor.firstName + 
                        " " + schedule.instructor.lastName;
                    scheduleID = schedule.id;
                    quotas = schedule.quotas;
                    startTime = scheduleTime.getHours();
                    scheduleDates = schedule.days;
                    type = schedule.workoutType.name;
                    typeEmoji = schedule.workoutType.emoji;
                    price = schedule.price;
                    
                    if (students.includes(user.id)) {
                        busy = true;
                    } else {
                        if (quotas === 0) unavailable = true;
                        else available = true;
                    }
                }
            }
        })

        const variables = busy => {
            return openModal(
                quotas, startTime, 
                scheduleDates, scheduleID, 
                type, busy, instructor, price
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

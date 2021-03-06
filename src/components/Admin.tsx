import { useState } from 'react';
import { useSelector } from 'react-redux';

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
    const [classInfo, setClassInfo] = useState({
        quotas: 0,
        startDate: '',
        scheduleDays: [],
        price: 100,
        scheduleID: 0,
        type: '',
        instructor: '',
        students: [],
    });

    const viewClassComponent = () => {
        return <>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Cupos: </strong>
                    {classInfo.quotas}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Estudiantes: </strong>
                    {classInfo.students.length === 0 && <span>No hay estudiantes inscritos</span>}
                    {classInfo.students.map(student => student.firstName + " " + student.lastName).join(', ')}
                </ListGroup.Item>
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
        </>
    }

    const openModal = (quotas, startDate, price, scheduleDates, scheduleID, type, busy, instructor, students) => {
        setClassInfo({ ...classInfo, quotas, startDate, price, scheduleDates, scheduleID, type, instructor, students });
        setModalTitle(`Clase de ${type}`);
        setShowModal(true)
    }

    const ClassDay = ({ day, hour }) => {
        let available = false;
        let quotas = 0;
        let startDate = '';
        let scheduleDates = [];
        let scheduleID = '';
        let type = '';
        let typeEmoji = '';
        let instructor = '';
        let students = [];
        let price = 0;

        classes?.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const schudelTime = new Date(schedule.startDate);
                const hourStart = schudelTime.getHours().toString();
                const classTime = hour < 10 ? hour.replace('0', '') : hour;
                
                if (hourStart === classTime) {
                    students = schedule.students;
                    instructor = schedule.instructor.firstName + 
                        " " + schedule.instructor.lastName;
                    scheduleID = schedule.id;
                    quotas = schedule.quotas;
                    startDate = schudelTime.toString();
                    scheduleDates = schedule.days;
                    type = schedule.workoutType.name;
                    typeEmoji = schedule.workoutType.emoji;
                    available = true;
                    price = schedule.price;
                }
            }
        })

        const variables = busy => {
            return openModal(
                quotas, startDate, price,
                scheduleDates, scheduleID, 
                type, busy, instructor, students
            );
        }
        
        if (available)
            return (
                <td className="available">
                    <div onClick={() => variables(false)}>
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
                ModalBody={viewClassComponent}
            />
        </div>  
    )
}


export default Client;

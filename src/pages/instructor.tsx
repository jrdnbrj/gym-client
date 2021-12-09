import { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from 'react-redux';

import weekScheduleAllMutation from '../graphql/weekScheduleAllQuery';

import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Calendar from '../components/Calendar';
import Modal from "../components/Modal";


const types = {
    Aerobics: 'Aerobicos',
    Stength: 'Fuerza',
    Stretch: 'Estiramiento',
    Balance: 'Balance',
    MartialArts: 'Artes marciales',
}

const emojis = {
    Aerobics: '🏃🏻',
    Stength: '🏋🏼',
    Stretch: '🤸',
    Balance: '🧍🏻',
    MartialArts: '🙅🏻',
}

const instructor = () => {

    const user = useSelector(state => state.user.user);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [classInfo, setClassInfo] = useState({
        quotas: 0,
        startDate: '',
        scheduleDays: [],
        scheduleID: 0,
        students: 0,
        type: ''
    });

    const { loading, error, data, refetch } = useQuery(weekScheduleAllMutation);

    const viewClassComponent = () => {
        return <>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Horario: </strong>
                    {classInfo.startDate.split(' ')[4]}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Días de clases: </strong>
                    {classInfo.scheduleDates.join(', ')}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Estudiantes: </strong>
                    {classInfo.students}
                </ListGroup.Item>
            </ListGroup>
        </>
    }

    const openModal = (quotas, startDate, scheduleDates, scheduleID, students, type) => {
        setClassInfo({ ...classInfo, quotas, startDate, scheduleDates, scheduleID, students, type });
        setModalTitle(`Clase de ${types[type]}`);
        setShowModal(true)
    }

    const ClassDay = ({ i, j, day, hour }) => {
        let available = false;
        let quotas = 0;
        let startDate = '';
        let scheduleDates = [];
        let scheduleID = '';
        let students = 0;
        let type = '';

        data?.weekScheduleAll?.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const schudelTime = new Date(schedule.startDate);
                const hourStart = schudelTime.getUTCHours().toString();

                if (hourStart === hour) {
                    if (schedule.instructor.userID === parseInt(user.id)) {
                        available = true;
                        quotas = schedule.quotas;
                        startDate = schudelTime.toUTCString();
                        scheduleDates = schedule.days;
                        scheduleID = schedule.id;
                        students = schedule.students.length;
                        type = schedule.workoutType;
                    }
                }
            }
        })

        const variables = () => {
            return openModal(
                quotas, startDate, scheduleDates, 
                scheduleID, students, type
            );
        }

        if (available) 
            return (
                <td className="available">
                    <div onClick={variables}>
                        {emojis[type]}
                    </div>
                </td>
            )

        return <td></td>
    }

    return (
        <div className="mx-3">
            {loading ? <div>Cargando...</div> : <Calendar ClassDay={ClassDay} /> }
            <Modal 
                show={showModal}
                onHide={() => setShowModal(false)} 
                header={modalTitle}
                ModalBody={viewClassComponent}
            />
        </div> 
    )
}


export default instructor;

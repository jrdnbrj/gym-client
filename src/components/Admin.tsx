import { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from 'react-redux';

import weekScheduleAll from '../graphql/query/weekScheduleAll';
import weekScheduleAddStudent from '../graphql/mutation/weekScheduleAddStudent';

import Spinner from 'react-bootstrap/Spinner';
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
    MartialArts: 'Artes Marciales',
}

const emojis = {
    Aerobics: '🏃🏻',
    Stength: '💪🏻',
    Stretch: '🤸',
    Balance: '🧍🏻',
    MartialArts: '🤼🏻',
}

const Client = () => {

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

    const { loading, error, data, refetch } = useQuery(weekScheduleAll);

    const [bookClass, { loading: loadingBook }] = useMutation(
        weekScheduleAddStudent, {
            onCompleted: () => {
                refetch();
                setShowModal(false);
                alert('Clase reservada con éxito');
            },
            onError: (error) => {
                console.log(error);
                alert('Error al reservar clase. Recarga la página e inténtalo de nuevo');
            }
        } 
    );

    const bookClassSubmit = e => {
        e.preventDefault();
        bookClass({ 
            variables: { 
                clientID: user.clientID,
                weekScheduleID: classInfo.scheduleID,
            } 
        });
    }

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

    const openModal = (quotas, startDate, scheduleDates, scheduleID, type, busy, instructor, students) => {
        console.log(quotas, startDate, scheduleDates, scheduleID, type, busy, instructor, students);
        setClassInfo({ ...classInfo, quotas, startDate, scheduleDates, scheduleID, type, instructor, students });
        setModalTitle(`Clase de ${types[type]}`);
        setShowModal(true)
    }

    const ClassDay = ({ i, j, day, hour }) => {
        let available = false;
        let quotas = 0;
        let startDate = '';
        let scheduleDates = [];
        let scheduleID = '';
        let type = '';
        let instructor = '';
        let students = [];

        data?.weekScheduleAll?.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const schudelTime = new Date(schedule.startDate);
                const hourStart = schudelTime.getUTCHours().toString();

                if (hourStart === hour) {
                    students = schedule.students;
                    instructor = schedule.instructor.firstName + 
                        " " + schedule.instructor.lastName;
                    scheduleID = schedule.id;
                    quotas = schedule.quotas;
                    startDate = schudelTime.toUTCString();
                    scheduleDates = schedule.days;
                    type = schedule.workoutType;
                    available = true;
                }
            }
        })

        const variables = busy => {
            return openModal(
                quotas, startDate, 
                scheduleDates, scheduleID, 
                type, busy, instructor, students
            );
        }
        
        if (available)
            return (
                <td className="available">
                    <div onClick={() => variables(false)}>
                        {emojis[type]}
                    </div>
                </td>
            )

        return <td />
    }

    return (
        <div className="mx-3">
            {loading ? 
                <Spinner animation="border" variant="primary" /> : 
                <Calendar ClassDay={ClassDay} /> 
            }
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

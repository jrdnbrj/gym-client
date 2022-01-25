import { useState } from "react";

import CreateClass from "./CreateClass";
import EditClass from "./EditClass";
import Modal from "./Modal";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const days = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miercoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sabado",
    Sunday: "Domingo"
}

const WeekSchedules = ({ classes, refetchClasses, instructors, workoutTypes }) => {
    
    const [modalShow, setModalShow] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [classData, setClassData] = useState({});

    const getTime = datetime => {
        const date = new Date(datetime);
        const hours = date.getHours();

        return hours < 10 ? `0${hours}:00` : `${hours}:00`;
    }

    const getStudents = students => {
        if (students.length === 0)
            return "Sin estudiantes";

        return students.map(student => 
            student.firstName + " " + student.lastName
        ).join(", ");
    }

    const openEditModal = clase => {
        setClassData(clase);
        setEditModal(true);
    }

    return (
        <>
            <Button 
                size="sm" className="mt-5 mb-2 float-end"
                onClick={() => setModalShow(true)}
            >
                Crear Nueva Clase
                <i className="bi bi-plus-circle ms-2" />
            </Button>
            <Table striped hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TIPO DE CLASE</th>
                        <th>DÍAS</th>
                        <th>HORA</th>
                        <th>PRECIO</th>
                        <th>INSTRUCTOR</th>
                        <th>ESTUDIANTES</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((clase, i) => {
                        return (
                            <tr key={i} onClick={() => openEditModal(clase)}>
                                <td>{i + 1}</td>
                                <td>{clase.workoutType.emoji} {clase.workoutType.name}</td>
                                <td>{clase.days.map(day => days[day]).join("/")}</td>
                                <td>{getTime(clase.startDate)}</td>
                                <td>$ {clase.price}</td>
                                <td className="instructor">{clase.instructor.firstName} {clase.instructor.lastName}</td>
                                <td className="students">{getStudents(clase.students)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal
                header="Nueva Clase"
                show={modalShow}
                onHide={() => setModalShow(false)}
                ModalBody={() => 
                    <CreateClass 
                        workoutTypes={workoutTypes} 
                        instructors={instructors}
                        refetchClasses={refetchClasses}
                        closeModal={() => setModalShow(false)}
                    />
                }
            />
            <Modal
                header="Editar Clase"
                show={editModal}
                onHide={() => setEditModal(false)}
                ModalBody={() => 
                    <EditClass 
                        workoutTypes={workoutTypes} 
                        instructors={instructors}
                        refetchClasses={refetchClasses}
                        clase={classData}
                        closeModal={() => setEditModal(false)}
                    />
                }
            />
        </>
    );
};

export default WeekSchedules;

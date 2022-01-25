import { useState } from "react";

import CreateClass from "./CreateClass";
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
                        <th>INSTRUCTOR</th>
                        <th>ESTUDIANTES</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((clase, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{clase.workoutType.emoji} {clase.workoutType.name}</td>
                                <td>{clase.days.map(day => days[day]).join(" - ")}</td>
                                <td>{getTime(clase.startDate)}</td>
                                <td>{clase.instructor.firstName} {clase.instructor.lastName}</td>
                                <td>{getStudents(clase.students)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal
                header="Crear Nueva Clase"
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
        </>
    );
};

export default WeekSchedules;

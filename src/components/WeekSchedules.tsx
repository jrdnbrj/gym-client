import { useState, useEffect } from "react";

import CreateClass from "./CreateClass";
import EditClass from "./EditClass";
import Modal from "./Modal";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


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
    const [search, setSearch] = useState("");
    const [filteredClasses, setFilteredClasses] = useState(classes);

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

    useEffect(() => {
        if (search.length > 0) {
            const filtered = classes.filter(clase => {
                const fullName = clase.instructor.firstName + " " + clase.instructor.lastName;
                const workoutTypeName = clase.workoutType.name;
                const students = clase.students.map(student =>
                    student.firstName + " " + student.lastName
                ).join(", ");
                const dayss = clase.days.map(day => days[day]).join(", ");

                return fullName.toLowerCase().includes(search.toLowerCase()) ||
                    workoutTypeName.toLowerCase().includes(search.toLowerCase()) ||
                    students.toLowerCase().includes(search.toLowerCase()) ||
                    dayss.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredClasses(filtered);
        } else
            setFilteredClasses(classes);
    }, [search]);

    useEffect(() => {
        if (classes)
            setFilteredClasses(classes);
    }, [classes]);

    return (
        <>
            <Button 
                size="sm" className="mt-5 mb-2 float-end"
                onClick={() => setModalShow(true)}
            >
                Crear Nueva Clase
                <i className="bi bi-plus-circle ms-2" />
            </Button>
            <input 
                className="form-control mb-2" placeholder="Buscar..."
                value={search} onChange={e => setSearch(e.target.value)} 
            />
            <Table striped hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TIPO DE CLASE</th>
                        <th>
                            CUPOS
                            <Badge bg="secondary" className="ms-1">
                                total
                            </Badge>
                        </th>
                        <th>DÍAS</th>
                        <th>HORA</th>
                        <th>PRECIO</th>
                        <th>INSTRUCTOR</th>
                        <th>ESTUDIANTES</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClasses.map((clase, i) => {
                        return (
                            <tr key={i} onClick={() => openEditModal(clase)}>
                                <td>{i + 1}</td>
                                <td>{clase.workoutType.emoji} {clase.workoutType.name}</td>
                                <td>
                                    {clase.quotas}
                                    <Badge bg="secondary" className="ms-1">
                                        {clase.quotas + clase.students.length}
                                    </Badge>
                                </td>
                                <td>{clase.days.map(day => days[day]).join("/")}</td>
                                <td>{getTime(clase.startDate)}</td>
                                <td>$ {clase.price}</td>
                                <td className="instructor">{clase.instructor.firstName} {clase.instructor.lastName}</td>
                                <td className="students">({clase.students.length}) {getStudents(clase.students)}</td>
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

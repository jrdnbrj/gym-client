import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

import instructorSendEmailWeekSchedule from "../graphql/mutation/instructorSendEmailWeekSchedule";
import attendanceRecordAll from "../graphql/query/attendanceRecordAll";
import attendanceRecordCreate from "../graphql/mutation/attendanceRecordCreate";
import attendanceRecordSetAssisted from "../graphql/mutation/attendanceRecordSetAssisted";
import attendanceRecordSetNotAssisted from "../graphql/mutation/attendanceRecordSetNotAssisted";

import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Calendar from "../components/Calendar";
import Modal from "../components/Modal";


const Instructor = ({ classes }) => {

    const user = useSelector(state => state.user.user);

    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [classInfo, setClassInfo] = useState({
        quotas: 0,
        startDate: "",
        scheduleDays: [],
        scheduleID: 0,
        students: [],
        type: "",
        today: "",
        attendedIDs: [],
    });

    const { loading: attendanceLoading, data: attendanceData, refetch } = useQuery(attendanceRecordAll);
    const [instructorSendEmail, { loading: loadingEmail }] = useMutation(
        instructorSendEmailWeekSchedule, {
            onCompleted: () => {
                alert("El correo ha sido enviado a todos los alumnos inscritos.");
            },
            onError: (error) => {
                console.log(error);
                alert("Ha ocurrido un error al enviar el correo. Intenta nuevamente.");
            }
        } 
    );
    const [attendanceCreate, { loading: loadingAttendance }] = useMutation(
        attendanceRecordCreate, {
            onCompleted: () => {
                console.log("Se ha registrado la asistencia.");
            },
            onError: error => {
                console.log(error.message);
            }
        }
    );
    const [attendanceSetAssisted, { loading: loadingAssisted }] = useMutation(
        attendanceRecordSetAssisted, {
            onCompleted: () => {
                refetch();
                console.log("1Se ha registrado la asistencia.");
            },
            onError: error => {
                console.log(error.message);
                console.log("1Ha ocurrido un error al registrar la asistencia. Intenta nuevamente.");
            }
        }
    );
    const [attendanceSetNotAssisted, { loading: loadingAssisted2 }] = useMutation(
        attendanceRecordSetNotAssisted, {
            onCompleted: () => {
                refetch();
                console.log("2Se ha registrado la asistencia.");
            },
            onError: error => {
                console.log(error.message);
                console.log("2Ha ocurrido un error al registrar la asistencia. Intenta nuevamente.");
            }
        }
    );

    const sendEmail = () => {
        const message = document.getElementById("message").value;
        console.log(classInfo.scheduleID, message);
        instructorSendEmail({
            variables: {
                weekScheduleID: classInfo.scheduleID,
                message,
            }
        });
    }

    const attendanceToday = date => {
        const todayDate = new Date(date);
        
        if (todayDate.getUTCDate() === classInfo.today && 
            todayDate.getUTCMonth() === classInfo.month)
            return true;

        return false;
    }

    const GetAttendance = () => {

        if (classInfo.students.length < 1)
            return <span>Aún no hay estudiantes registrados</span>;

        if (attendanceLoading)
            return <Spinner animation="border" variant="primary" />;

        return attendanceData?.attendanceRecordAll?.map(item => {
            if (item.weekSchedule.id !== parseInt(classInfo.scheduleID))
                return null;

            return item.attendance.map((attendance, i) => {
                return classInfo.students.map(student => {
                    if (attendance.studentID === parseInt(student.id)) {
                        if (attendanceToday(item.date)) {
                            if (attendance.attended) {
                                return (
                                    <span key={i}>
                                        {student.firstName} {student.lastName}✔️{". "}
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={i}>
                                        {student.firstName} {student.lastName}❌{". "}
                                    </span>
                                );
                            }
                        } else {
                            return (
                                <span key={i}>
                                    {student.firstName} {student.lastName}{". "}
                                </span>
                            );
                        }
                    }
                });
            });
        });
    }

    const GetAttendanceeee = () => {

        if (classInfo.students.length < 1)
            return <span>Aún no hay estudiantes registrados</span>;

        if (attendanceLoading)
            return <Spinner animation="border" variant="primary" />;

        return classInfo.students.map(student => {
            return attendanceData?.attendanceRecordAll?.map(item => {
                if (item.weekSchedule.id !== parseInt(classInfo.scheduleID))
                    return null;

                return item.attendance.map((attendance, i) => {
                    if (attendance.studentID === parseInt(student.id)) {
                        if (attendanceToday(item.date)) {
                            if (attendance.attended) {
                                return (
                                    <span key={i}>
                                        {student.firstName} {student.lastName}✔️{". "}
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={i}>
                                        {student.firstName} {student.lastName}❌{". "}
                                    </span>
                                );
                            }
                        } else {
                            return (
                                <span key={i}>
                                    {student.firstName} {student.lastName}{". "}
                                </span>
                            );
                        }
                    }
                });
            });
        });
    }

    const saveAttendance = async e => {
        e.preventDefault();

        const noAssisted = []
        const assisted = classInfo.attendedIDs.map(id => parseInt(id))
        
        classInfo.students.forEach(student => {
            if (!classInfo.attendedIDs.includes(student.id))
                noAssisted.push(parseInt(student.id));
        })

        await attendanceSetAssisted({
            variables: {
                notAssistedIDs: assisted,
                weekScheduleID: classInfo.scheduleID,
            }
        });

        await attendanceSetNotAssisted({
            variables: {
                notAssistedIDs: noAssisted,
                weekScheduleID: classInfo.scheduleID,
            }
        });
    }

    const handleCheckboxChange = e => {
        const { id, checked } = e.target;
        const newAttendedIDs = [...classInfo.attendedIDs];

        if (checked) {
            newAttendedIDs.push(id);
        } else {
            newAttendedIDs.splice(newAttendedIDs.indexOf(id), 1);
        }

        setClassInfo({ ...classInfo, attendedIDs: newAttendedIDs });
    }

    const Attendance = () => {
        if (classInfo.students.length < 1)
            return null

        const date = new Date()

        if (classInfo.today !== date.getDate())
            return null;

        return (
            <ListGroup.Item>
                <strong>Asistencia: </strong>
                <Form onSubmit={saveAttendance}>
                    <ListGroup>
                        {classInfo.students.map((student, i) => {
                            return (
                                <ListGroup.Item key={i}>
                                    {student.firstName} {student.lastName}
                                    <Form.Check 
                                        type="checkbox" id={student.id}  
                                        className="ms-1 attendance-checkbox"
                                        onChange={handleCheckboxChange}
                                        aria-label="checkbox"
                                        checked={classInfo.attendedIDs.includes(student.id)}
                                    />
                                </ListGroup.Item>
                            );
                                    
                        })}
                    </ListGroup>
                    <Button variant="primary" size="sm" type="submit" className="mt-1">
                        {(loadingAssisted || loadingAssisted2) && 
                            <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                        Guardar Asistencia
                    </Button>
                </Form>
            </ListGroup.Item>
        );
    }

    const viewClassComponent = () => {
        return <>
            <ListGroup>
                <ListGroup.Item>
                    <strong>Horario: </strong>
                    {classInfo.startDate &&
                        classInfo.startDate?.toUTCString()?.split(" ")[4]}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Días de clases: </strong>
                    {classInfo.scheduleDates?.join(", ")}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Estudiantes: </strong>
                    <GetAttendance />
                </ListGroup.Item>
                <Attendance />
                <ListGroup.Item>
                    <FloatingLabel label="Envia un mensaje a tus estudiantes.">
                        <Form.Control
                            as="textarea"
                            placeholder="mensaje"
                            style={{ height: "150px" }}
                            id="message"
                        />
                    </FloatingLabel>
                    <Button 
                        variant="primary" 
                        style={{ marginTop: "3px" }}
                        onClick={sendEmail}
                        size="sm"
                    >
                        {loadingEmail ? 
                            <Spinner animation="border" size="sm" /> : 
                            "Enviar Mensaje"}
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </>
    }

    const openModal = (
        quotas, startDate, scheduleDates, scheduleID, 
        students, type, today, month
    ) => {
        // console.log('attendanceData', attendanceData.attendanceRecordAll.filter(item => 
        //     (item.weekSchedule.id === parseInt(scheduleID))))
        attendanceCreate({ variables: { weekScheduleID: scheduleID } });
        setClassInfo({ 
            ...classInfo, quotas, startDate, scheduleDates, 
            scheduleID, students, type, today, month 
        });
        setModalTitle(`Clase de ${type}`);
        setShowModal(true)
    }

    const ClassDay = ({ day, today, month, hour }) => {
        let available = false;
        let quotas = 0;
        let startDate = "";
        let scheduleDates = [];
        let scheduleID = "";
        let students = 0;
        let type = "";
        let typeEmoji = "";

        classes.forEach(schedule => {
            if (schedule.days.includes(day[2])) {
                const schudelTime = new Date(schedule.startDate);
                const hourStart = schudelTime.getUTCHours().toString();

                if (hourStart === hour) {
                    if (schedule.instructor.id === user.id) {
                        available = true;
                        quotas = schedule.quotas;
                        startDate = schudelTime;
                        scheduleDates = schedule.days;
                        scheduleID = schedule.id;
                        students = schedule.students;
                        type = schedule.workoutType.name;
                        typeEmoji = schedule.workoutType.emoji;
                    }
                }
            }
        })

        const variables = () => {
            return openModal(
                quotas, startDate, scheduleDates, 
                scheduleID, students, type, today, month
            );
        }

        if (available) 
            return (
                <td className="available">
                    <div onClick={variables}>
                        {typeEmoji}
                    </div>
                </td>
            )

        return <td />
    }

    const handleHideModal = () => {
        setShowModal(false);
        setClassInfo({
            quotas: 0,
            startDate: "",
            scheduleDays: [],
            scheduleID: 0,
            students: [],
            type: "",
            today: "",
            attendedIDs: [],
        });
    }

    return (
        <div className="mx-3">
            <Calendar ClassDay={ClassDay} />
            <Modal 
                show={showModal}
                onHide={handleHideModal} 
                header={modalTitle}
                ModalBody={viewClassComponent}
            />
        </div> 
    )
}


export default Instructor;

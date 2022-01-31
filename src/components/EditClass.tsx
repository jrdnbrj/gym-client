import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useQuery, useMutation } from "@apollo/client";
import userAll from "../graphql/query/userAll";
import weekScheduleEdit from "../graphql/mutation/weekScheduleEdit";
import weekScheduleRemove from "../graphql/mutation/weekScheduleRemove";


const days = [
    ["Lunes", "Monday"], ["Martes", "Tuesday"], ["Miercoles", "Wednesday"], 
    ["Jueves", "Thursday"], ["Viernes", "Friday"], ["Sabado", "Saturday"], 
    ["Domingo", "Sunday"]
]

const dayss = {
    Monday: "Lunes", Tuesday: "Martes", Wednesday: "Miércoles", Thursday: "Jueves",
    Friday: "Viernes", Saturday: "Sábado", Sunday: "Domingo"
}

const hours = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
]

const EditClass = ({ workoutTypes, instructors, refetchClasses, closeModal, clase }) => {
    const [users, setUsers] = useState([]);
    const [msgError, setMsgError] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [formData, setFormData] = useState({
        workoutTypeName: "",
        instructorID: "",
        startDate: "",
        weekDays: [],
        days: [],
        price: "",
        quotas: "",
        students: []
    });

    const { data } = useQuery(userAll);
    const [editSchedule, { loading: loadingEdit, reset: resetEdit }] = useMutation(
        weekScheduleEdit, {
            onCompleted: () => {
                refetchClasses();
                setFormValid(false);
                setFormData({
                    workoutTypeName: "",
                    instructorID: "",
                    startDate: "",
                    weekDays: [],
                    days: [],
                    price: "",
                    quotas: "",
                    students: []
                });
                setMsgError("");
                resetEdit();
                closeModal();
            },
            onError: error => {
                console.log("editSchedule Error:", error.message);
                setMsgError(error.message);
            }
        }
    );
    const [removeSchedule, { loading: loadingRemove, reset: resetRemove }] = useMutation(
        weekScheduleRemove, {
            onCompleted: () => {
                refetchClasses();
                setFormValid(false);
                setFormData({
                    workoutTypeName: "",
                    instructorID: "",
                    startDate: "",
                    weekDays: [],
                    days: [],
                    price: "",
                    quotas: "",
                    students: []
                });
                setMsgError("");
                resetRemove();
                closeModal();
            },
            onError: error => {
                console.log("removeSchedule Error:", error.message);
                setMsgError("Error al eliminar la clase. Inténtalo de nuevo.");
            }
        }
    );

    useEffect(() => {
        setFormData({
            weekScheduleID: clase.id,
            workoutTypeName: clase.workoutType.name,
            instructorID: clase.instructor.id,
            startDate: clase.startDate,
            weekDays: clase.days,
            days: [],
            price: clase.price,
            quotas: clase.quotas + clase.students.length,
            students: clase.students
        });
    }, [clase]);

    useEffect(() => {
        if (formValid) {
            delete formData.weekDays;
            editSchedule({ variables: { ...formData } });
        }
    }, [formData])

    useEffect(() => {
        if (data)
            setUsers(data.userAll);
    }, [data]);

    const removeClass = () => removeSchedule({ variables: { weekScheduleID: clase.id } });

    const handleControlChange = e => {
        if (e.target.id === "startDate") {
            const startDate = new Date();
            startDate.setHours(e.target.value.split(":")[0]);
            startDate.setMinutes(0);
            startDate.setSeconds(0);

            setFormData({ ...formData, startDate: startDate.toISOString() });
        } else if (e.target.id === "price") {
            const price = parseFloat(e.target.value);
            setFormData({ ...formData, price });
        } else if (e.target.id === "quotas") {
            const quotas = parseInt(e.target.value);
            setFormData({ ...formData, quotas });
        } else 
            setFormData({ ...formData, [e.target.id]: e.target.value });

        setFormValid(false);
        setMsgError("");
    };

    const handleCheckboxChange = e => {
        setFormValid(false);
        setMsgError("");

        const { id, checked } = e.target;
        const newWeekDays = [...formData.days];

        if (checked)
            newWeekDays.push(id);
        else
            newWeekDays.splice(newWeekDays.indexOf(id), 1);

        setFormData({ ...formData, days: newWeekDays });
    };

    const onSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        if (formData.workoutTypeName === "") {
            setMsgError("Selecciona un tipo de clase.");
            return;
        }

        if (formData.instructorID === "") {
            setMsgError("Selecciona un instructor.");
            return;
        }

        if (formData.startDate === "") {
            setMsgError("Selecciona una hora de clase.");
            return;
        }

        if (formData.price === "") {
            setMsgError("Ingresa un precio.");
            return;
        }

        if (formData.days.length === 0) {
            setMsgError("Selecciona al menos un día de la semana.");
            return;
        }

        setMsgError("");
        setFormValid(true);

        // const quotas = formData.quotas < formData.students.length 
        // setFormData({ ...formData, quotas: formData.quotas - formData.students.length });
        setFormData({ ...formData });
    }

    const startDateValue = () => {
        const date = new Date(formData.startDate);
        const hours = date.getHours();

        return hours < 10 ? `0${hours}:00` : `${hours}:00`;
    }

    return (
        <div className="m-1">
            <Form onSubmit={onSubmit}>
                <FloatingLabel controlId="workoutTypeName" label="Tipo de clase">
                    <Form.Select value={formData.workoutTypeName} onChange={handleControlChange}>
                        <option hidden>Escoge un tipo de clase</option>
                        {workoutTypes.map((type, i) => {
                            return <option key={i} value={type.name}>{type.emoji} {type.name}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="instructorID" label="Instructor" className="my-2">
                    <Form.Select value={formData.instructorID} onChange={handleControlChange}>
                        <option hidden>Escoge un Instructor</option>
                        {instructors?.map((instructor, i) => {
                            return <option key={i} value={instructor.id}>
                                {instructor.firstName} {instructor.lastName}
                            </option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="startDate" label="Hora de Clase">
                    <Form.Select value={startDateValue()} onChange={handleControlChange}>
                        <option hidden>Escoge un horario</option>
                        {hours.map((hour, i) => {
                            return <option key={i} value={hour}>{hour}</option>
                        })}
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="price" label="Ingresa el precio mensual" className="my-2">
                    <Form.Control type="number" value={formData.price} onChange={handleControlChange} step=".01" />
                </FloatingLabel>
                <FloatingLabel controlId="quotas" label="Total de Cupos de la Clase" className="my-2">
                    <Form.Control type="number" value={formData.quotas} onChange={handleControlChange} />
                </FloatingLabel>
                <ListGroup className="my-2">
                    <ListGroup.Item>
                        <Form.Text className="text-muted mb-1">
                            Escoge uno o varios días para la clase.
                        </Form.Text>
                        <Form.Group className="inline-checkbox my-1 text-center" controlId="days">
                            {days.map((day, i) => {
                                return <Form.Check 
                                    inline key={i} type="checkbox" id={day[1]} 
                                    label={day[0]} className="ms-1"
                                    onChange={handleCheckboxChange} 
                                />
                            })}
                        </Form.Group>
                        <Form.Text className="text-muted mb-1">
                            Días actuales: {formData.weekDays?.map(day => dayss[day]).join(", ")}.
                        </Form.Text>
                    </ListGroup.Item>
                </ListGroup>
                <Button variant="success" type="submit">
                    {loadingEdit && <Spinner animation="grow" size="sm" className="me-1" />}
                    Editar Clase
                </Button>
                {clase?.students.length === 0 && 
                    <Button variant="danger" className="float-end" onClick={removeClass}>
                        {loadingRemove && <Spinner animation="grow" size="sm" className="me-1" />}
                        Eliminar Clase
                    </Button>}
                {msgError && <Alert variant="danger" className="my-2">{msgError}</Alert>}
            </Form>
        </div>
    );
}

export default EditClass

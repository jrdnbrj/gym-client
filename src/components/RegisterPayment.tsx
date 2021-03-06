import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import adminSubmitPayment from "../graphql/mutation/adminSubmitPayment";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";


const days = {
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
    Sunday: "Domingo"
}

const RegisterPayment = ({ users, classes }) => {

    const router = useRouter();

    const [formData, setFormData] = useState({ clientID: "", weekScheduleID: "", months: 1 });
    const [formValid, setFormValid] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const [submitPayment, { loading }] = useMutation(adminSubmitPayment, {
        onCompleted: () => {
            setPaymentCompleted(true);
            setFormData({ clientID: "", weekScheduleID: "", months: 1 });
        },
        onError: error => {}
        // onError: error => alert(error.message)
    });

    const handleControlChange = e => {
        setPaymentCompleted(false);
        if (e.target.id === "clientID")
            setFormData({ "clientID": e.target.value, weekScheduleID: "", months: 1 });
        else 
            setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleDatalistChange = e => {
        setPaymentCompleted(false);

        const client = users.find(user => user.email === e.target.value);

        if (client)
            setFormData({ ...formData, clientID: client.id });
        else
            setFormData({ ...formData, clientID: "" });
    };

    useEffect(() => {
        if (formValid)
            submitPayment({ variables: {...formData} });
    }, [formData]);

    const getTime = startDate => {
        const date = new Date(startDate);
        const hours = date.getHours();

        return hours < 10 ? `0${hours}:00` : `${hours}:00`;
    }

    const getDays = scheduleDates => {
        return scheduleDates.map(day => days[day]).join(", ");
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const months = parseInt(formData.months);
        setFormData({ ...formData, months });

        setFormValid(true);
    }

    return (
        <Container className="my-5">
            <h3>Pago de Clases</h3>
            <Form onSubmit={onSubmit}>
                <FloatingLabel controlId="clientID" label="Escoge el usuario al que vas a hacerle un registro de salud.">
                    <input list="users" className="form-control" placeholder="_" onChange={handleDatalistChange} />
                    <datalist id="users">
                        {users.map((user, i) => {
                            return (
                                <option key={i} value={user.email} id="asdasd">
                                    {user.firstName} {user.lastName}
                                </option>
                            );
                        })}
                    </datalist>  
                </FloatingLabel>
                {formData.clientID &&
                    <FloatingLabel controlId="weekScheduleID" label="Clase a pagar" className="my-2">
                        <Form.Select value={formData.weekScheduleID} onChange={handleControlChange} required>
                            <option hidden>Escoge la clase que se pagó.</option>
                            {classes.map((clase, i) => {
                                const students = Array.from(clase.students, student => student.id);

                                if (!students.includes(formData.clientID))
                                    return null;

                                return (
                                    <option key={i} value={clase.id}>
                                        {clase.workoutType.emoji} {clase.workoutType.name}{" // "}
                                        HORARIO: {getTime(clase.startDate)} {getDays(clase.days)}{" // "}
                                        INSTRUCTOR: {clase.instructor.firstName} {clase.instructor.lastName}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </FloatingLabel>}
                {formData.weekScheduleID &&
                    <>
                        <FloatingLabel controlId="months" label="Cantidad de Meses Pagados" required>
                            <Form.Select value={formData.months} onChange={handleControlChange}>
                                <option hidden>Escoge la cantidad de meses que se pagó.</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </Form.Select>
                        </FloatingLabel>
                        <Button variant="primary" type="submit" className="my-2">
                            {loading && <Spinner animation="grow" size="sm" className="me-1" />}
                            Registrar Pago
                        </Button>
                    </>}
            </Form>
            {paymentCompleted && 
                <Alert variant="success" className="my-3">
                    ✔️ El pago se ha registrado con éxito. Puedes descargar el comprobante en tu <Link href="/perfil">perfil</Link>.
                </Alert>}
        </Container>
    );
};

export default RegisterPayment;

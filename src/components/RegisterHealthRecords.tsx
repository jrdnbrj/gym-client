import { useState } from "react";
import { useMutation } from "@apollo/client";

import healthRecordCreate from "../graphql/mutation/healthRecordCreate";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const RegisterHealthRecords = ({ users, classes }) => {

    const [formData, setFormData] = useState({ 
        clientID: "", weight: "", height: "", 
        pulse: "", bloodPressure: "" 
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [registerCompleted, setRegisterCompleted] = useState(false);

    const [createHealthRecord, { loading }] = useMutation(healthRecordCreate, {
        onCompleted: () => {
            setFormData({ clientID: "", weight: "", height: "", pulse: "", bloodPressure: "" });
            setRegisterCompleted(true);
            setErrorMsg("");
        },
        onError: error => alert(error.message)
    });

    const validateBloodPressure = bloodPressure => {
        const regex = /^\d{1,3}\/\d{1,3}$/;
        return regex.test(bloodPressure);
    }

    const handleControlChange = e => {
        setErrorMsg("");
        setRegisterCompleted(false);

        if (e.target.id === "bloodPressure")
            if (!validateBloodPressure(e.target.value)) {
                setErrorMsg("La presión arterial debe tener el formato: 120/80.");
                return;
            }

        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (formData.weight.length < 1) {
            setErrorMsg("El peso debe tener mas de 1 caracter.");
            return;
        }

        if (formData.height.length < 1) {
            setErrorMsg("La altura debe tener mas de 1 caracter.");
            return;
        }
        
        if (formData.pulse.length < 1) {
            setErrorMsg("La frecuencia cardíaca debe tener mas de 1 caracter.");
            return;
        }

        if (!validateBloodPressure(formData.bloodPressure)) {
            setErrorMsg("La presión arterial debe tener el formato: 120/80.");
            return;
        }
        
        const variables = {
            clientID: formData.clientID,
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            pulse: parseInt(formData.pulse),
            systolicPressure: parseInt(formData.bloodPressure.split("/")[0]),
            diastolicPressure: parseInt(formData.bloodPressure.split("/")[1])
        };

        createHealthRecord({ variables });
    }

    return (
        <Container className="my-5">
            <h3>Registros de Salud</h3>
            <Form onSubmit={onSubmit}>
                <FloatingLabel controlId="clientID" label="Usuario a registrar a pago">
                    <Form.Select value={formData.clientID} onChange={handleControlChange} required>
                        <option hidden>Escoge el usuario al que vas a hacerle un registro de salud.</option>
                        {users.map((user, i) => {
                            return (
                                <option key={i} value={user.id}>
                                    {user.firstName} {user.lastName} - {user.email}
                                </option>
                            );
                        })}
                    </Form.Select>
                </FloatingLabel>
                {formData.clientID &&
                    <> 
                        <Row className="mt-2">
                            <Col>
                                <FloatingLabel controlId="weight" label="Peso en Kg">
                                    <Form.Control type="number" step="0.01" placeholder="70" onChange={handleControlChange} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="height" label="Altura en m">
                                    <Form.Control type="number" step="0.01" placeholder="1.70" onChange={handleControlChange} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="pulse" label="Pulso en bpm">
                                    <Form.Control type="number" placeholder="80" onChange={handleControlChange} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="bloodPressure" label="Presión Arterial en mmHg">
                                    <Form.Control type="text" placeholder="120/80" onChange={handleControlChange} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" className="my-2">
                            {loading && <Spinner animation="grow" size="sm" className="me-1" />}
                            Registrar
                        </Button>
                    </>}
            </Form>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {registerCompleted && 
                <Alert variant="success" className="my-3">
                    ✔️ El historial de salud se ha registrado con éxito.
                </Alert>}
        </Container>
    );
};

export default RegisterHealthRecords;


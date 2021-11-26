import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import workoutImage from "../../public/workout.jpeg";
import React, { useState } from "react";
import OkFeedback from "../components/OkFeedback";
import NotOkFeedback from "../components/NotOkFeedback";

export interface RegisterProps {}
export interface RegisterFormProps {}

const RegisterForm = (_props: RegisterFormProps): JSX.Element => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FormGroup controlId="registerFormFirstName" className="mb-3">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl type="text" placeholder="Nombre" required />
                    <OkFeedback />
                    <NotOkFeedback message="Ingrese un nombre" />
                </FormGroup>

                <FormGroup controlId="registerFormLastName" className="mb-3">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl type="text" placeholder="Apellido" required />
                    <OkFeedback />
                    <NotOkFeedback message="Apellido" />
                </FormGroup>

                <FormGroup controlId="registerFormEmail" className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Email" required />
                    <OkFeedback />
                    <NotOkFeedback message="Ingrese un email válido." />
                </FormGroup>

                <FormGroup controlId="registerFormPassword" className="mb-3">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Contraseña"
                        required
                    />
                </FormGroup>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>
        </Container>
    );
};

const Register = (_props: RegisterProps): JSX.Element => {
    return (
        <Container fluid>
            <Row md={2} sm={1} className="vh-100 align-items-center">
                {/* Hide on smaller than medium screens.*/}
                <Col className="d-none d-md-block text-center">
                    <Image src={workoutImage} alt="imagen ejercicio" />
                </Col>
                <Col>
                    <RegisterForm />
                </Col>
            </Row>
        </Container>
    );
};

export default Register;

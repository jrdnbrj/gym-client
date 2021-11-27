import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import * as EmailValidator from "email-validator";

import Image from "next/image";
import workoutImage from "../../public/workout.jpeg";

import React, { useState } from "react";

import OkFeedback from "../components/OkFeedback";
import NotOkFeedback from "../components/NotOkFeedback";

import { useMutation } from "@apollo/client/react";
import registerMutation from "../graphql/registerMutation";

export interface RegisterProps {}
export interface RegisterFormProps {}

const RegisterForm = (_props: RegisterFormProps): JSX.Element => {
    const [register, { loading, error, data, reset }] =
        useMutation(registerMutation);

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const [isDataValid, setIsDataValid] = useState({
        email: false,
        firstName: false,
        lastName: false,
        password: false,
    });

    const handleControlChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
        setValidated(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        // Validate data
        let isFormValid = true;

        if (!EmailValidator.validate(formData.email)) {
            setIsDataValid({ ...isDataValid, email: false });
            isFormValid = false;
        }

        if (!formData.firstName) {
            setIsDataValid({ ...isDataValid, firstName: false });
            isFormValid = false;
        }

        if (!formData.lastName) {
            setIsDataValid({ ...isDataValid, lastName: false });
            isFormValid = false;
        }

        if (!formData.password) {
            setIsDataValid({ ...isDataValid, password: false });
            isFormValid = false;
        }

        console.log("Valid form!");
        console.log(formData);
        // API request
        if (isFormValid) {
            setValidated(false);

            reset();
            register({ variables: formData }).catch((e) => console.log(e));
        }
    };

    const RequestStatus = (): JSX.Element => {
        let message = "";

        if (loading) {
            message = "Cargando...";
        } else if (error) {
            message = `Un error ha ocurrido:\n${error.message}`;
        } else if (data) {
            message = `Bienvenido, ${data.userRegister.firstName}. Por favor inicia sesión.`;
        }

        return <p>{message}</p>;
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FormGroup controlId="firstName" className="mb-3">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Nombre"
                        onChange={handleControlChange}
                        required
                    />
                    <OkFeedback />
                    <NotOkFeedback message="Ingrese un nombre" />
                </FormGroup>

                <FormGroup controlId="lastName" className="mb-3">
                    <FormLabel>Apellido</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Apellido"
                        onChange={handleControlChange}
                        required
                    />
                    <OkFeedback />
                    <NotOkFeedback message="Apellido" />
                </FormGroup>

                <FormGroup controlId="email" className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Email"
                        onChange={handleControlChange}
                        required
                    />
                    <OkFeedback />
                    <NotOkFeedback message="Ingrese un email válido." />
                </FormGroup>

                <FormGroup controlId="password" className="mb-3">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        type="password"
                        onChange={handleControlChange}
                        placeholder="Contraseña"
                        required
                    />
                </FormGroup>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>

            <RequestStatus />
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

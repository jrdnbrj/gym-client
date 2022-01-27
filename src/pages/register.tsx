import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import * as EmailValidator from "email-validator";

import Image from "next/image";
import workoutImage from "../../public/workout.jpeg";

import React, { useState } from "react";
import { useRouter } from 'next/router';

import OkFeedback from "../components/OkFeedback";
import NotOkFeedback from "../components/NotOkFeedback";

import { useMutation } from "@apollo/client/react";
import userRegister from "../graphql/mutation/userRegister";


export interface RegisterProps {}
export interface RegisterFormProps {}

const RegisterForm = (_props: RegisterFormProps): JSX.Element => {
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState();
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        isClient: true,
        isInstructor: false,
        isAdmin: false,
    });

    const [register, { loading, error, data, reset }] = useMutation(
        userRegister, {
            onCompleted: () => {
                router.push("/login");
                reset()
            },
            onError: (error) => {
                console.log(error);
                setErrorMsg(error.message);
            }
        }
    );     

    const handleControlChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const validateName = text => {
        const regex = /^[a-z ]+$/i;
        return regex.test(text);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!EmailValidator.validate(formData.email)) {
            setErrorMsg("Debes ingresar un email válido.");
            return;
        }

        if (formData.firstName.length < 3) {
            setErrorMsg("Tu nombre debe tener al menos 3 caracteres.");
            return;
        }

        if (!validateName(formData.firstName)) {
            setErrorMsg("Tu nombre debe tener solo letras.");
            return;
        }

        if (formData.lastName.length < 3) {
            setErrorMsg("Tu apellido debe tener al menos 3 caracteres.");
            return;
        }

        if (!validateName(formData.lastName)) {
            setErrorMsg("Tu apellido debe tener solo letras.");
            return;
        }

        if (formData.password.length < 6) {
            setErrorMsg("Tu contraseña debe tener al menos 6 caracteres.");
            return;
        }

        console.log("formData:", formData);
        register({ variables: formData })
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="firstName" className="mb-3">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl
                        type="text"
                        value={formData.firstName}
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
                        value={formData.lastName}
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
                        value={formData.email}
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
                        value={formData.password}
                        placeholder="Contraseña"
                        onChange={handleControlChange}
                        required
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="mb-3">
                    {loading && <Spinner animation="border" size="sm" className="me-1" />}
                    Registrarse
                </Button>
            </Form>
            {errorMsg && <Alert variant="danger" className="my-3">{errorMsg}</Alert>}
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

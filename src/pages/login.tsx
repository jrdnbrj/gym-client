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
import { useMutation } from "@apollo/client";
import loginMutation from "../graphql/loginMutation";

export interface LoginProps {}
export interface LoginFormProps {}

const LoginForm = (_props: LoginFormProps): JSX.Element => {
    const [validated, setValidated] = useState(false);
    const [login, { loading, error, data }] = useMutation(loginMutation);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const RequestStatus = (): JSX.Element => {
        let message = "";

        if (loading) {
            message = "Cargando...";
        } else if (error) {
            message = `Un error ha ocurrido:\n${error.message}`;
        } else if (data) {
            message = `Bienvenido, ${data.userLogin.firstName}.`;
        }

        return <p>{message}</p>;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        // TODO: Prevent API request if form is invalid.
        login({ variables: { email, password } });
        event.preventDefault();
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <FormGroup controlId="loginFormEmail" className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <OkFeedback />
                    <NotOkFeedback message="Ingrese un email válido." />
                </FormGroup>

                <FormGroup controlId="loginFormPassword" className="mb-3">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Contraseña"
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </FormGroup>

                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>

            <RequestStatus />
        </Container>
    );
};

const Login = (_props: LoginProps): JSX.Element => {
    return (
        <Container fluid>
            <Row md={2} sm={1} className="vh-100 align-items-center">
                {/* Hide on smaller than medium screens.*/}
                <Col className="d-none d-md-block text-center">
                    <Image src={workoutImage} alt="imagen ejercicio" />
                </Col>
                <Col>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

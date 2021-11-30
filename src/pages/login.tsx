import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import * as EmailValidator from "email-validator";

import workoutImage from "../../public/workout.jpeg";
import OkFeedback from "../components/OkFeedback";
import NotOkFeedback from "../components/NotOkFeedback";
import { useMutation } from "@apollo/client";
import loginMutation from "../graphql/loginMutation";

export interface LoginProps {}
export interface LoginFormProps {}

const LoginForm = (_props: LoginFormProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        // if (user.id) router.push("/");
        if (user.id) window.location.href = "/";
    } , [user]);

    const [login, { loading, error, data, reset }] = useMutation(loginMutation, {
        onCompleted: ({ userLogin }) => {
            dispatch({ type: "SET_USER", user: {
                id: userLogin.id,
                firstName: userLogin.firstName,
                lastName: userLogin.lastName,
                email: userLogin.email,
            }});
        },
        onError: (error) => console.log(error)
    });

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isControlValid, setIsControlValid] = useState({
        email: false,
        password: false,
    });

    const handleControlChange = ({
        target,
    }: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: set ifValid for each form control based on isControlValid.
        setFormData({ ...formData, [target.id]: target.value });
        setValidated(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

        // Validate data
        let isFormValid = true;
        if (!EmailValidator.validate(formData.email)) {
            setIsControlValid({ ...isControlValid, email: false });
            isFormValid = false;
        }

        if (!formData.password) {
            setIsControlValid({ ...isControlValid, password: false });
            isFormValid = false;
        }

        if (isFormValid) {
            setValidated(false);

            reset();
            login({ variables: formData })
        }
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                        required
                        onChange={handleControlChange}
                    />
                </FormGroup>

                <Button variant="primary" type="submit" className="mb-3">
                    {loading ? <Spinner size="sm" /> : ""}
                    Ingresar
                </Button>
            </Form>

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

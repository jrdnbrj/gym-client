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
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import * as EmailValidator from "email-validator";

import workoutImage from "../../public/workout.jpeg";

import OkFeedback from "../components/OkFeedback";
import NotOkFeedback from "../components/NotOkFeedback";
import { useMutation } from "@apollo/client";
import userLogin from "../graphql/mutation/userLogin";
import userForgotPassword from "../graphql/mutation/userForgotPassword";

export interface LoginProps {}
export interface LoginFormProps {}

const LoginForm = (_props: LoginFormProps): JSX.Element => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        if (user.id)
            window.location.href = "/";
    } , [user]);

    const [login, { loading, error, data, reset }] = useMutation(userLogin, {
        onCompleted: ({ userLogin }) => {
            dispatch({ type: "SET_USER", user: { ...userLogin } });
            router.push("/");
        },
        onError: (error) => {
            console.log(error);
            alert(error.message);
        }
    });

    const [forgotPassword, { loading: forgotPasswordLoading }] = useMutation(
        userForgotPassword, {
        onCompleted: (data) => {
            alert('Te enviamos un correo con un enlace para cambiar tu contraseña.');
            console.log(data);
        },
        onError: (error) => console.log(error)
    });

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState();
    const [isControlValid, setIsControlValid] = useState({
        email: false,
        password: false,
    });

    const handleControlChange = ({ target }) => {
        setFormData({ ...formData, [target.id]: target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!EmailValidator.validate(formData.email)) {
            setErrorMsg("Tu email es incorrecto.");
            return;
        }

        if (formData.password.length < 2) {
            setErrorMsg("La contraseña es incorrecta.");
            return;
        }

        login({ variables: formData })
    };

    const [forgot, setForgot] = useState(false);

    const onChangeForgot = () => forgotPassword({ variables: { userEmail: email } });

    const onForgot = () => {
        setForgot(true);
        setEmail(formData.email);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
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
                    {loading && <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                    Ingresar
                </Button>
                <span className="forgot-password" onClick={onForgot}>
                    Olvidé la contraseña
                </span>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                {forgot && 
                    <>
                        <FloatingLabel label="Ingresa tu email">
                            <Form.Control type="text" placeholder="Ingresa tu email" 
                                onChange={e => setEmail(e.target.value)} value={email}    
                            />
                        </FloatingLabel>
                        <Button 
                            variant="primary" 
                            className="my-3"
                            onClick={() => onChangeForgot()}
                        >
                            {forgotPasswordLoading ? 
                                <Spinner animation="border" variant="light" size="sm" className="me-1" /> 
                                : null}
                            Enviar Email
                        </Button>
                    </>
                }
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

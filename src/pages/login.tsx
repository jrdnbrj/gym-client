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
import loginMutation from "../graphql/loginMutation";
import forgotPasswordMutation from "../graphql/forgotPasswordMutation";
import changePasswordMutation from "../graphql/changePasswordMutation";

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

    const [forgotPassword, { loading: forgotPasswordLoading }] = useMutation(
        forgotPasswordMutation, {
        onCompleted: (data) => {
            alert('El correo ha sido enviado.');
            console.log(data);
        },
        onError: (error) => console.log(error)
    });

    const [changePassword, { loading: changePasswordLoading }] = useMutation(
        changePasswordMutation, {
        onCompleted: (data) => {
            alert("La contraseña se ha cambiado correctamente. Por favor inicia sesión con tu nueva contraseña.");
            console.log(data);
        },
        onError: (error) => console.log(error)
    });

    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");

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

    const [forgot, setForgot] = useState(false);

    const onChangeForgot = () => {
        if (!token) {
            console.log("No Token");
            forgotPassword({ variables: { userEmail: email } });
        }
        else {
            console.log("token");
            changePassword({ 
                variables: { 
                    newPassword: password, 
                    token: token 
                }
            });
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
                <span
                    className="forgot-password"
                    onClick={() => setForgot(true)}
                >
                    Olvidé la contraseña
                </span>
                {forgot && 
                    <>
                        <FloatingLabel label="Ingresa tu email">
                            <Form.Control type="text" placeholder="Ingresa tu email" 
                                onChange={e => setEmail(e.target.value)} value={email}    
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Ingresa el token enviado al mail">
                            <Form.Control type="text" placeholder="Ingresa el token enviado al mail" 
                                onChange={e => setToken(e.target.value)} value={token}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Ingresa la nueva contraseña">
                            <Form.Control type="password" placeholder="Ingresa la nueva contraseña" 
                                onChange={e => setPassword(e.target.value)} value={password}
                            />
                        </FloatingLabel>
                        <Button 
                            variant="primary" 
                            className="my-3"
                            onClick={() => onChangeForgot()}
                        >
                            {loading ? <Spinner size="sm" /> : ""}
                            Recuperar Contraseña
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

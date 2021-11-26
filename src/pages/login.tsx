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

export interface LoginProps {}
export interface LoginFormProps {}

const LoginForm = (_props: LoginFormProps): JSX.Element => {
    return (
        <Container>
            <Form noValidate>
                <FormGroup controlId="loginFormEmail" className="mb-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Email" required />
                </FormGroup>

                <FormGroup controlId="loginFormPassword" className="mb-3">
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Contraseña"
                        required
                    />
                </FormGroup>
            </Form>

            <Button variant="primary" type="submit">
                Login
            </Button>
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

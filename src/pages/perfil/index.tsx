import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";

import * as EmailValidator from "email-validator";

import userEditInfo from "../../graphql/mutation/userEditInfo";
import clientReceiptsFrom from "../../graphql/query/clientReceiptsFrom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import Loading from "../../components/Loading";


const Profile = ({ user, refetch }) => {

    const [errorMsg, setErrorMsg] = useState();

    const router = useRouter();

    const { loading: loadingReceipts, data } = useQuery(clientReceiptsFrom, {
        variables: { clientID: user.id }
    });
    const [editUserInfo, { loading }] = useMutation(userEditInfo, {
        onCompleted: () => {
            refetch();
            alert("Se ha actualizado la información con éxito.");
        },
        onError: error => {
            console.log(error);
            setErrorMsg(error.message);
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setErrorMsg("");

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;

        if (firstName.length === 0) {
            setErrorMsg("Debes ingresar un nombre.");
            return;
        }

        if (!validateName(firstName)) {
            setErrorMsg("Tu nombre debe tener solo letras.");
            return;
        }

        if (lastName.length === 0) {
            setErrorMsg("Debes ingresar un apellido.");
            return;
        }

        if (!validateName(lastName)) {
            setErrorMsg("Tu apellido debe tener solo letras.");
            return;
        }

        if (!EmailValidator.validate(email)) {
            setErrorMsg("Debes ingresar un email válido.");
            return;
        }

        editUserInfo({ variables: { firstName, lastName, email } });
    }

    const getIMC = (weight, height) => {
        const imc = weight / (height * height);

        return imc.toFixed(1);
    }

    const getTakenAt = date => {
        const datetime = new Date(date);
        let minutes = datetime.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const fecha = `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;
        const time = `${datetime.getHours()}:${minutes}`;
        return `${fecha} ${time}`;
    }

    const validateName = text => {
        const regex = /^[a-z ]+$/i;
        return regex.test(text);
    };

    const downloadPdf = (data, i) => {
        const args = {
            id: `0${i+13}`,
            clase: data.workoutTypeName,
            precio: data.totalAmount,
            fecha: getTakenAt(data.transactionDate),
            nombre: `${user.firstName} ${user.lastName}`,
            email: user.email,
            path: '/perfil'
        }
        router.push(`/pdf?${Object.keys(args).map(key => key + '=' + args[key]).join('&')}`);
    }

    if (loadingReceipts)
        return <Loading name="Comprobantes de Pago" />;

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Row className="mt-5">
                    <Col>
                        <Form.Group controlId="firstName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Escribe tu nombre" 
                                defaultValue={user.firstName} required
                            /> 
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text" placeholder="Escribe tu apellido"
                                defaultValue={user.lastName} required
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email" placeholder="Escribe tu email"
                                defaultValue={user.email} required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="my-2">
                    {loading && <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                    Guardar
                </Button>
            </Form>
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <hr />
            <div className="my-4">
                <h2>Historico de Mediciones</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Peso (Kg)</th>
                            <th>Altura (m)</th>
                            <th>IMC</th>
                            <th>Pulso (bpm)</th>
                            <th>Presión Arterial (mmHg)</th> {/* milimetros de mercurio */}
                            <th>Fecha</th>
                            <th>Tomado por</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.healthRecords?.map((data, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.weight}</td>
                                <td>{data.height}</td>
                                <td>{getIMC(data.weight, data.height)}</td>
                                <td>{data.pulse}</td>
                                <td>{data.systolicPressure}/{data.diastolicPressure}</td>
                                <td>{getTakenAt(data.takenAt)}</td>
                                <td>{data.takenBy.firstName} {data.takenBy.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <hr />
            <div>
                <h2>Comprobantes de Pago</h2>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Clase</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.clientReceiptsFrom.map((data, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{getTakenAt(data.transactionDate)}</td>
                                <td>{data.workoutTypeName}</td>
                                <td>$ {data.totalAmount}</td>
                                <td>
                                    <i 
                                        className="bi bi-file-pdf" 
                                        onClick={() => downloadPdf(data, i+1)}
                                        title="Descargar Comprobante" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default Profile;

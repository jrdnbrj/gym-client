import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import * as EmailValidator from "email-validator";

import userEditInfo from "../../graphql/mutation/userEditInfo";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";


const medicalData = [
    {
        id: 1,
        weight: "75",
        height: "1.68",
        pulse: "80",
        bloodPressure: "120/80",
        date: "2020-01-01"
    },
    {
        id: 2,
        weight: "68",
        height: "1.59",
        pulse: "90",
        bloodPressure: "110/90",
        date: "2020-01-02"
    },
    {
        id: 3,
        weight: "70",
        height: "1.60",
        pulse: "100",
        bloodPressure: "120/80",
        date: "2020-01-03"
    },
    {
        id: 4,
        weight: "75",
        height: "1.70",
        pulse: "110",
        bloodPressure: "130/90",
        date: "2020-01-04"
    },
    {
        id: 5,
        weight: "80",
        height: "1.80",
        pulse: "120",
        bloodPressure: "140/100",
        date: "2020-01-05"
    },
    {
        id: 6,
        weight: "85",
        height: "1.90",
        pulse: "130",
        bloodPressure: "150/110",
        date: "2020-01-06"
    }
];

const paymentData = [
    {
        id: 1,
        date: "2020-01-01",
        amount: "100",
        class: "Aerobicos"
    },
    {
        id: 2,
        date: "2020-01-02",
        amount: "200",
        class: "Fuerza"
    },
    {
        id: 3,
        date: "2020-01-03",
        amount: "300",
        class: "Artes Marciales"
    },
    {
        id: 4,
        date: "2020-01-04",
        amount: "400",
        class: "Estiramiento"
    }
];

const Profile = ({ user, refetch }) => {

    const [errorMsg, setErrorMsg] = useState();

    const router = useRouter();

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

        if (lastName.length === 0) {
            setErrorMsg("Debes ingresar un apellido.");
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

    const downloadPdf = data => {
        const args = {
            id: data.id,
            clase: data.class,
            precio: data.amount,
            fecha: data.date,
            nombre: `${user.firstName} ${user.lastName}`,
            email: user.email
        }
        router.push(`/pdf?${Object.keys(args).map(key => key + '=' + args[key]).join('&')}`);
    }

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
                        </tr>
                    </thead>
                    <tbody>
                        {medicalData.map((data, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.weight}</td>
                                <td>{data.height}</td>
                                <td>{getIMC(data.weight, data.height)}</td>
                                <td>{data.pulse}</td>
                                <td>{data.bloodPressure}</td>
                                <td>{data.date}</td>
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
                        {paymentData.map((data, i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{data.date}</td>
                                <td>{data.class}</td>
                                <td>$ {data.amount}</td>
                                <td>
                                    <i 
                                        className="bi bi-file-pdf" 
                                        onClick={() => downloadPdf(data)}
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

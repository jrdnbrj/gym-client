import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import workoutTypeCreate from "../graphql/mutation/workoutTypeCreate";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import Modal from "../components/Modal";


const colors = [
    "#6CBB7A", "#fadc9b", "#f9a59a", "#6a9eff", "#6CCCC9", 
    "#9CC95C", "#B399D4", "#D9D9D9", "#d8af97", "#fdfd96"
];

const WorkoutTypes = ({ workoutTypes, refetchTypes }) => {
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [createWorkoutType, { loading: loadingCreate }] = useMutation(workoutTypeCreate, {
        onCompleted: () => {
            refetchTypes();
            setShowModal(false);
            setErrorMsg('');
        },
        onError: error => setErrorMsg(error.message)
    });

    const onSubmit = (e) => {
        e.preventDefault();

        setErrorMsg('');

        const form = e.target;
        const name = form.elements.name.value;
        const emoji = form.elements.emoji.value;

        createWorkoutType({ variables: { name, emoji } });
    }

    const ModalBody = () => {
        return (
            <Form onSubmit={onSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Nombre de la Clase</Form.Label>
                        <Form.Control type="text" placeholder="Escribe un nombre" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="emoji">
                        <Form.Label>Emoji</Form.Label>
                        <Form.Control type="text" placeholder="Ingresa un emoji" />
                    </Form.Group>
                </Row>
                {errorMsg && 
                    <Alert variant="danger">{errorMsg}</Alert>}
                <Button variant="primary" type="submit">
                    {loadingCreate &&
                        <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                    Agregar
                </Button>
            </Form>
        );
    }

    return <>
        <Card.Body>
            <Row>
                {workoutTypes?.map(type => (
                    <Col 
                        key={type.name} className="workout-type"
                        style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                    >
                        <span>{type.emoji} {type.name}</span>
                    </Col>
                ))}
                <Col 
                    className="workout-type add-type"
                    onClick={() => setShowModal(true)}
                >
                    <span>Agregar</span>
                    <i className="bi bi-plus-circle ms-2" />
                </Col>
            </Row>
        </Card.Body>
        <Modal 
            show={showModal}
            onHide={() => setShowModal(false)} 
            header="Agregar Tipo de Clase"
            ModalBody={ModalBody}
        />
    </>;
}

export default WorkoutTypes;

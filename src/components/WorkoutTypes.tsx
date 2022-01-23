import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import workoutTypeCreate from "../graphql/mutation/workoutTypeCreate";
import workoutTypeEdit from "../graphql/mutation/workoutTypeEdit";
import workoutTypeDelete from "../graphql/mutation/workoutTypeDelete";

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

const WorkoutTypes = ({ workoutTypes, refetchTypes, refetchClasses }) => {
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [typeName, setTypeName] = useState('');
    const [typeEmoji, setTypeEmoji] = useState('');

    const [createWorkoutType, { loading: loadingCreate }] = useMutation(workoutTypeCreate, {
        onCompleted: () => {
            refetchTypes();
            setShowModal(false);
            setErrorMsg('');
            setTypeName('');
            setTypeEmoji('');
        },
        onError: error => setErrorMsg(error.message)
    });
    const [editWorkoutType, { loading: loadingEdit }] = useMutation(workoutTypeEdit, {
        onCompleted: () => {
            refetchTypes();
            refetchClasses();
            setShowEdit(false);
            setErrorMsg('');
            setTypeName('');
            setTypeEmoji('');
        },
        onError: error => setErrorMsg(error.message)
    });
    const [deleteWorkoutType, { loading: loadingDelete }] = useMutation(workoutTypeDelete, {
        onCompleted: () => {
            refetchTypes();
            setShowModal(false);
            setErrorMsg('');
            setDeleteError('');
        },
        onError: error => setDeleteError(error.message)
    });

    const onSubmit = (e) => {
        e.preventDefault();

        setErrorMsg('');

        const form = e.target;
        const name = form.elements.name.value;
        const emoji = form.elements.emoji.value;

        if (name.length === 0) {
            setErrorMsg('El nombre no puede estar vacío.');
            return;
        }

        if (emoji.length === 0) {
            setErrorMsg('El emoji no puede estar vacío.');
            return;
        }

        if (typeName && typeEmoji)
            editWorkoutType({ 
                variables: { 
                    originalName: typeName, 
                    newName: name, 
                    newEmoji: emoji 
                } 
            });
        else
            createWorkoutType({ variables: { name, emoji } });
    }

    const openEditModal = (name, emoji) => {
        setDeleteError('');

        setShowEdit(true);
        setTypeName(name);
        setTypeEmoji(emoji);
    }

    const removeWorkoutType = name => {
        setDeleteError('');

        if (confirm(`¿Estás seguro que de eliminar el tipo de clase "${name}"?`))
            deleteWorkoutType({ variables: { name } });
    }

    const ModalBody = () => {
        return (
            <Form onSubmit={onSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Nombre de la Clase</Form.Label>
                        <Form.Control 
                            type="text" placeholder="Escribe un nombre" 
                            defaultValue={typeName} required
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="emoji">
                        <Form.Label>Emoji</Form.Label>
                        <Form.Control 
                            type="text" placeholder="Ingresa un emoji" 
                            defaultValue={typeEmoji} required
                        />
                    </Form.Group>
                </Row>
                {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                <Button variant="primary" type="submit">
                    {loadingCreate || loadingEdit &&
                        <Spinner animation="border" variant="light" size="sm" className="me-1" />}
                    {typeName && typeEmoji ? "Editar" : "Agregar"}
                </Button>
            </Form>
        );
    }

    return <>
        <Card.Body className="mt-5">
            <Row>
                {workoutTypes?.map(type => (
                    <Col 
                        key={type.name} className="workout-type" title="Tipo de Clase"
                        style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                    >
                        <span 
                            onClick={() => openEditModal(type.name, type.emoji)}
                        >
                            {type.emoji} {type.name}
                        </span>
                        <i 
                            className="bi bi-x-circle-fill" 
                            onClick={() => removeWorkoutType(type.name)}   
                        />
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
        {deleteError && <Alert variant="danger">{deleteError}</Alert>}
        <Modal 
            show={showModal}
            onHide={() => setShowModal(false)} 
            header="Agregar Tipo de Clase"
            ModalBody={ModalBody}
        />
        <Modal 
            show={showEdit}
            onHide={() => setShowEdit(false)} 
            header="Editar Tipo de Clase"
            ModalBody={ModalBody}
        />
    </>;
}

export default WorkoutTypes;

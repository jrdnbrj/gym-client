import { useEffect } from "react";

import { useMutation } from "@apollo/client";
import adminUserRoles from "../graphql/mutation/adminUserRoles";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Loading from "./Loading";


const UsersList = ({ users, refetchUsers }) => {

    const [userRoles, { loading }] = useMutation(adminUserRoles, {
        onCompleted: () => refetchUsers(),
        onError: error => alert(error.message)
    });

    const handleAddRole = (userID, isAdmin, name) => {
        const isClient = true;
        const isInstructor = true;
        let message = "";

        if (isAdmin)
            message = 
                `¿Estás seguro que deseas agregar el rol de administrador a ${name}? 
                
                Esta acción no se puede deshacer.`;
        else
            message = 
                `¿Estás seguro que deseas agregar el rol de instructor a ${name}?
                
                Esta acción no se puede deshacer.`;

        if (confirm(message))
            userRoles({ variables: { userID, isClient, isInstructor, isAdmin } });
    }

    const handleRemoveRole = (userID, isInstructor, name) => {
        const isClient = true;
        const isAdmin = false;
        let message = "";

        if (isInstructor)
            message =
                `¿Estás seguro que deseas eliminar el rol de administrador de ${name}?
                
                Esta acción no se puede deshacer.`;
        else
            message =
                `¿Estás seguro que deseas eliminar el rol de instructor de ${name}?

                Esta acción no se puede deshacer.`;

        if (confirm(message))
            userRoles({ variables: { userID, isClient, isInstructor, isAdmin } });
    }

    if (loading)
        return <Loading name="Roles" />;

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <strong>DEPORTISTAS</strong>
                        </ListGroup.Item>
                        {users.map(user => {
                            if (!user.isClient)
                                return null
                            
                            const name = `${user.firstName} ${user.lastName}`;

                            return <ListGroup.Item key={user.id} className="user-list">
                                {name}
                                {!user.isInstructor &&
                                    <Button 
                                        variant="success" title="hacer instructor" className="mx-1"
                                        size="sm" onClick={() => handleAddRole(user.id, false, name)}
                                    >
                                        <i className="bi bi-person-badge" />
                                    </Button>
                                }
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <strong>INSTRUCTORES</strong>
                        </ListGroup.Item>
                        {users.map(user => {
                            if (!user.isInstructor)
                                return null
                            
                            const name = `${user.firstName} ${user.lastName}`;

                            return <ListGroup.Item key={user.id} className="user-list">
                                {name}
                                {!user.isAdmin &&
                                    <Button 
                                        variant="primary" title="hacer administrador" className="mx-1"
                                        size="sm" onClick={() => handleAddRole(user.id, true, name)}
                                    >
                                        <i className="bi bi-person-rolodex" />
                                    </Button>}
                                {user.instructor?.weekSchedules.length === 0 &&
                                    <Button 
                                        variant="danger" title="Quitar rol de Instructor" className="mx-1"
                                        size="sm" onClick={() => handleRemoveRole(user.id, false, name)}
                                    >
                                        <i className="bi bi-x-circle" />
                                    </Button>}
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <strong>ADMINISTRADORES</strong>
                        </ListGroup.Item>
                        {users.map(user => {
                            if (!user.isAdmin)
                                return null

                            const name = `${user.firstName} ${user.lastName}`;
                            
                            return <ListGroup.Item key={user.id} className="user-list">
                                {name}
                                <Button 
                                    variant="danger" title="Quitar rol de administrador" className="mx-1"
                                    size="sm" onClick={() => handleRemoveRole(user.id, true, name)}
                                >
                                    <i className="bi bi-x-circle" />
                                </Button>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}


export default UsersList;

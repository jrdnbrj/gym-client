import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useQuery, useMutation } from "@apollo/client";
import userAll from "../../graphql/query/userAll";
import adminUserRoles from "../../graphql/mutation/adminUserRoles";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Loading from "../../components/Loading";


const usuarios = () => {

    const router = useRouter();

    const currentRole = useSelector(state => state.user.currentRole);

    const { loading, error, data, refetch } = useQuery(userAll);
    const [userRoles] = useMutation(adminUserRoles, {
        onCompleted: () => {
            // alert("Los roles se han actualizado con éxito.");
            refetch();
        },
        onError: error => {
            alert(error.message);
        }
    });

    if (loading)
        return <Loading name="Usuarios" />;

    // useEffect(() => {
    //     if (currentRole !== 'admin')
    //         router.push('/calendario'); 
    // }, [currentRole]);

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

        if (confirm(message)) {
            console.log('add role');
            userRoles({ variables: { userID, isClient, isInstructor, isAdmin } });
        } else {
            console.log('cancel');
        }
    }

    if (data) {
        return (
            <Container className="mt-5">
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>
                                <strong>Deportistas</strong>
                            </ListGroup.Item>
                            {data.userAll.map(user => {
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
                                <strong>Instructores</strong>
                            </ListGroup.Item>
                            {data.userAll.map(user => {
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
                                        </Button>
                                    }
                                </ListGroup.Item>
                            })}
                        </ListGroup>
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>
                                <strong>Administradores</strong>
                            </ListGroup.Item>
                            {data.userAll.map(user => {
                                if (user.isAdmin)
                                    return <ListGroup.Item key={user.id}>
                                        {user.firstName} {user.lastName}
                                    </ListGroup.Item>
                                else return null
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }

    return null;
}


export default usuarios;
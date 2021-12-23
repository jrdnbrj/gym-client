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

const usuarios = () => {

    const router = useRouter();

    const currentRole = useSelector(state => state.user.currentRole);

    const { loading, error, data, refetch } = useQuery(userAll);
    const [UserRoles] = useMutation(adminUserRoles, {
        onCompleted: () => {
            alert("Los roles se han actualizado con éxito.");
            refetch();
        },
        onError: error => {
            alert(error.message);
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // useEffect(() => {
    //     if (currentRole !== 'admin')
    //         router.push('/calendario'); 
    // }, [currentRole]);

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
                                if (user.isClient)
                                    return <ListGroup.Item key={user.id} className="user-list">
                                        {user.firstName} {user.lastName}
                                        {/* <Button variant="success" size="sm" className="mx-1" title="">
                                            <i className="bi bi-person-fill" />
                                        </Button> */}
                                        {/* <Button variant="primary" size="sm" className="mx-1">
                                            <i className="bi bi-person-badge" />
                                        </Button>
                                        <Button variant="secondary" size="sm" className="mx-1">
                                            <i className="bi bi-person-rolodex" />
                                        </Button> */}
                                    </ListGroup.Item>
                                else return null
                            })}
                        </ListGroup>
                    </Col>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>
                                <strong>Instructores</strong>
                            </ListGroup.Item>
                            {data.userAll.map(user => {
                                if (user.isInstructor)
                                    return <ListGroup.Item key={user.id}>
                                        {user.firstName} {user.lastName}
                                    </ListGroup.Item>
                                else return null
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
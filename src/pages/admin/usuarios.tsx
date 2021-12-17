import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useQuery } from "@apollo/client";
import userAll from "../../graphql/query/userAll";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const usuarios = () => {

    const router = useRouter();

    const currentRole = useSelector(state => state.user.currentRole);

    const { loading, error, data } = useQuery(userAll);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // useEffect(() => {
    //     if (currentRole !== 'admin')
    //         router.push('/calendario'); 
    // }, [currentRole]);

    if (data) {
        return (
            <Container>
                <Row>
                    <Col>
                        <ListGroup>
                            <ListGroup.Item>
                                <strong>Deportistas</strong>
                            </ListGroup.Item>
                            {data.userAll.map(user => {
                                if (user.isClient)
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
                </Row>
            </Container>
        )
    }

    return null;
}


export default usuarios;
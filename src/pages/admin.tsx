import { useQuery } from "@apollo/client";
import userAllQuery from "../graphql/userAllQuery";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


const admin = () => {

    const { loading, error, data } = useQuery(userAllQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

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
                                if (user.client)
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
                                if (user.instructor)
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
    } else return null;
};


export default admin;

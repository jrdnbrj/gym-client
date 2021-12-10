import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import logoutMutation from "../graphql/logoutMutation";
import meQuery from "../graphql/meQuery";


const Header = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { data, refetch } = useQuery(meQuery);

    useEffect(() => {
        console.log(data);
        if (data?.userMe) {
            dispatch({ 
                type: "SET_USER", 
                user: {
                    id: data.userMe.id,
                    firstName: data.userMe.firstName,
                    lastName: data.userMe.lastName,
                    email: data.userMe.email,
                    clientID: data.userMe.client?.id,
                    instructorID: data.userMe.instructor?.id,
                }
            });
        }
    }, [data]);

    const [logout] = useMutation(logoutMutation, { 
        onCompleted: (data) => {
            refetch();
            dispatch({ type: 'CLEAR_USER' })
        }
    });
    
    const UserIndicator = (): JSX.Element => {
        let message = "";

        if (data?.userMe) {
            return (
                <Nav>
                    <span className="header-name">
                        {data.userMe.firstName} {data.userMe.lastName}
                    </span>
                    <Button variant="outline-light ms-2" onClick={() => logout()}>
                        Cerrar Sesión
                    </Button>
                </Nav>
            );
        } else {
            return (
                <Nav className="header-login">
                    <Button 
                        variant="outline-light" 
                        onClick={() => router.push("/login")}
                    >
                        Iniciar Sesión
                    </Button>
                    <Button 
                        variant="outline-light ms-2" 
                        onClick={() => router.push("/register")}
                    >
                        Registrarse
                    </Button>
                </Nav>
            );
        }
    };

    const UserLinks = (): JSX.Element => {
        // if (data?.userMe.client) {
        //     return <Nav.Link 
        //         className="text-light" 
        //         onClick={() => router.push('calendario')}
        //     >
        //         Calendario
        //     </Nav.Link>
        // } else if (data?.userMe.instructor) {
        //     return (
        //         <Nav.Link 
        //             className="text-light" 
        //             onClick={() => router.push('instructor')}
        //         >
        //             Instructor
        //         </Nav.Link>
        //         <Nav.Link 
        //             className="text-light" 
        //             onClick={() => router.push('calendario')}
        //         >
        //             Calendario
        //         </Nav.Link>
        //     );
        // }
        if (data?.userMe)
            return (
                <Nav.Link 
                    className="text-light" 
                    onClick={() => router.push('calendario')}
                >
                    Calendario
                </Nav.Link>
            )
        else return null;
    };

    return (
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand className="radikal-logo">
                    <Link href="/">RADIKAL GYM</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <UserLinks />
                    </Nav>
                    <UserIndicator />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import userLogout from "../graphql/mutation/userLogout";
import userMe from "../graphql/query/userMe";


const Header = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const currentRole = useSelector(state => state.user.currentRole);

    const { data, refetch } = useQuery(userMe);

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
                    isClient: data.userMe.isClient,
                    isInstructor: data.userMe.isInstructor,
                    isAdmin: data.userMe.isAdmin,
                }
            });
            
            if (data?.userMe?.isInstructor)
                dispatch({ type: "SET_CURRENT_ROLE", payload: 'instructor' });
        }
    }, [data]);

    const [logout] = useMutation(userLogout, { 
        onCompleted: (data) => {
            refetch();
            dispatch({ type: 'CLEAR_USER' })
            dispatch({ type: 'CLEAR_CURRENT_ROLE' })
        }
    });

    const setRole = (role: string) => {
        dispatch({ type: 'SET_CURRENT_ROLE', payload: role });
    }

    const UserNameRole = () => {
        return <>
            {currentRole === 'client' && <i className="bi bi-person-fill" /> }
            {currentRole === 'instructor' && <i className="bi bi-person-badge" /> }
            {currentRole === 'admin' && <i className="bi bi-person-rolodex" /> }
            <span className="text-white mx-1">
                {data.userMe.firstName} {data.userMe.lastName}
            </span>
        </>
    }

    const UserRole = () => {
        return <NavDropdown.Header>
            <strong>Rol: </strong>
            {currentRole === 'client' && "Deportista"}
            {currentRole === 'instructor' && "Instructor"}
            {currentRole === 'admin' && "Administrador"}
        </NavDropdown.Header>
    }

    const UserIndicator = (): JSX.Element => {
        let message = "";

        if (data?.userMe) {
            return (
                <Nav>
                    <Navbar.Collapse id="navbar-dark-example">
                        <NavDropdown title={<UserNameRole />}>
                            <UserRole />
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => console.log('Perfil')}>
                                Perfil
                            </NavDropdown.Item>
                            {data.userMe.isInstructor && currentRole !== 'instructor' &&
                                <NavDropdown.Item onClick={() => setRole('instructor')}>
                                    Ver Como Instructor
                                </NavDropdown.Item>
                            }
                            {data.userMe.isClient && currentRole !== 'client' &&
                                <NavDropdown.Item onClick={() => setRole('client')}>
                                    Ver Como Cliente
                                </NavDropdown.Item>
                            }
                            {data.userMe.isAdmin && currentRole !== 'admin' &&
                                <NavDropdown.Item onClick={() => setRole('admin')}>
                                    Ver Como Admin
                                </NavDropdown.Item>
                            }
                            {currentRole === 'admin' &&
                                <>
                                    <NavDropdown.Item 
                                        onClick={() => router.push("/admin/usuarios")}
                                    >
                                        Usuarios
                                    </NavDropdown.Item>
                                    <NavDropdown.Item 
                                        onClick={() => router.push("/admin/clases")}
                                    >
                                        Clases
                                    </NavDropdown.Item>
                                </>
                            }
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => logout()}>
                                Cerrar Sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
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
        <Navbar bg="primary" expand="lg" variant="dark">
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

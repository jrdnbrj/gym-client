import Link from "next/link";
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

import userLogout from "../graphql/mutation/userLogout";


const Header = ({ user, role, refetch }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [logout] = useMutation(userLogout, { 
        onCompleted: (data) => {
            refetch();
            dispatch({ type: "CLEAR_USER" })
            dispatch({ type: "CLEAR_CURRENT_ROLE" })
            router.push("/")
        }
    });

    const setRole = role => dispatch({ type: "SET_CURRENT_ROLE", payload: role });

    const UserNameRole = () => {
        return <>
            {role === "client" && <i className="bi bi-person-fill" /> }
            {role === "instructor" && <i className="bi bi-person-badge" /> }
            {role === "admin" && <i className="bi bi-person-rolodex" /> }
            <span className="text-white mx-1">
                {user.firstName} {user.lastName}
            </span>
        </>
    }

    const UserRole = () => {
        return <NavDropdown.Header>
            <strong>Rol: </strong>
            {role === "client" && "Deportista"}
            {role === "instructor" && "Instructor"}
            {role === "admin" && "Administrador"}
        </NavDropdown.Header>
    }

    const UserIndicator = (): JSX.Element => {
        let message = "";

        if (user.id) {
            return (
                <Nav>
                    <Navbar.Collapse id="navbar-dark-example">
                        <NavDropdown title={<UserNameRole />}>
                            <UserRole />
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => router.push("/perfil")}>
                                Perfil
                            </NavDropdown.Item>
                            {user.isInstructor && role !== "instructor" &&
                                <NavDropdown.Item onClick={() => setRole("instructor")}>
                                    Ver Como Instructor
                                </NavDropdown.Item>
                            }
                            {user.isClient && role !== "client" &&
                                <NavDropdown.Item onClick={() => setRole("client")}>
                                    Ver Como Cliente
                                </NavDropdown.Item>
                            }
                            {user.isAdmin && role !== "admin" &&
                                <NavDropdown.Item onClick={() => setRole("admin")}>
                                    Ver Como Admin
                                </NavDropdown.Item>
                            }
                            {role === "admin" &&
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
        if (!user) return null;
        
        return (
            <Nav className="me-auto">
                <Nav.Link 
                    className="text-light" 
                    onClick={() => router.push("/calendario")}
                >
                    Calendario
                </Nav.Link>
                <Nav.Link 
                    className="text-light" 
                    onClick={() => router.push("/streaming")}
                >
                    Streaming
                </Nav.Link>
            </Nav>
        )
    };

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="radikal-logo">
                    <Link href="/">RADIKAL GYM</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <UserLinks />
                    <UserIndicator />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;

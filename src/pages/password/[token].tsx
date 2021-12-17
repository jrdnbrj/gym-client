import { useState } from "react";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import { useMutation } from "@apollo/client";
import userChangePassword from "../../graphql/mutation/userChangePassword";

const RecoverPassword = () => {

    const router = useRouter();

    const { token } = router.query;

    const [newPassword, setNewPassword] = useState("");
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

    const [changePassword, { loading }] = useMutation(
        userChangePassword, {
        onCompleted: (data) => {
            setMsgSuccess("Tu contraseña ha sido cambiada. Ya puedes iniciar sesión con tu nueva contraseña.");
            setMsgError("");
            console.log(data);
        },
        onError: (error) => {
            setMsgError("Ha ocurrido un error. Por favor intenta de nuevo.");
            setMsgSuccess("");
            console.log(error);
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (newPassword.length < 1) {
            setMsgError("Por favor ingresa una contraseña.");
            return;
        }

        changePassword({ variables: { newPassword, token } });
    }

    return (
        <Container>
            <div className="recover">
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingPassword" label="Escribe tu nueva contraseña">
                        <Form.Control type="password" placeholder="password" 
                            onChange={e => setNewPassword(e.target.value)} value={newPassword}/>
                    </FloatingLabel>
                    <Button variant="primary" type="submit" className="my-2">
                        {loading ? 
                            <Spinner animation="border" variant="light" size="sm" className="me-1" /> : 
                            null}
                        Cambiar Contraseña
                    </Button>
                    
                    {msgError && <Alert variant="danger">{msgError}</Alert>}
                    {msgSuccess && <Alert variant="success">{msgSuccess}</Alert>}
                </Form>
            </div>
        </Container>
    );
};

export default RecoverPassword;

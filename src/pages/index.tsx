import { useQuery } from "@apollo/client/react";
import { Container } from "react-bootstrap";
import meQuery from "../graphql/meQuery";

export interface HomeProps {}

export const Home = (_props: HomeProps): JSX.Element => {
    const { loading, error, data } = useQuery(meQuery);

    const UserIndicator = (): JSX.Element => {
        let message = "";

        if (loading) {
            message = "Cargando...";
        } else if (error) {
            message = `Un error ha ocurrido:\n${error.message}`;
        } else {
            if (data.userMe) {
                message = `Usuario: ${data.userMe.firstName} ${data.userMe.lastName}`;
            } else {
                message = "No autenticado. Inicie sesión o regístrese.";
            }
        }

        return <p>{message}</p>;
    };

    return (
        <Container fluid>
            <h1>RadikalGym</h1>
            <UserIndicator />
        </Container>
    );
};

export default Home;

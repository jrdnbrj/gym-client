import { Container } from "react-bootstrap";
import Calendar from "../components/Calendar";

export interface HomeProps {}

export const Home = (_props: HomeProps): JSX.Element => {
    return (
        <Container>
            <Calendar />
        </Container>
    );
};

export default Home;

import { Container } from "react-bootstrap";
import Calendar from "../components/Calendar";
// import Header from "../components/Header";

export interface HomeProps {}

export const Home = (_props: HomeProps): JSX.Element => {
    return (
        <>
            {/* <Header /> */}
            <Container>
                <Calendar />
            </Container>
        </>
    );
};

export default Home;

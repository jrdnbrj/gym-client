// import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';

import Carousel from "../components/Carousel";
import Student from "./student";
import Instructor from "./instructor";


export interface HomeProps {}

export const Home = (_props: HomeProps): JSX.Element => {

    const user = useSelector(state => state.user.user);

    const PageByRole = () => {
        if (!user.id) {
            return <Carousel />
        } else if (user.instructorID) {
            return <Instructor />
        } else {
            return <Student />
        }
    }

    return (
        <>
            <PageByRole />
        </>
    );
};

export default Home;

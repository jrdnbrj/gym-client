import { useDispatch, useSelector } from 'react-redux';

import Carousel from "../components/Carousel";


export interface HomeProps {}

export const Home = (_props: HomeProps): JSX.Element => {
    return <Carousel />;
};

export default Home;

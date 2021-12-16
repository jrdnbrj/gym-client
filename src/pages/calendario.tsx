import { useSelector } from 'react-redux';
import Client from "../components/Client";
import Instructor from "../components/Instructor";
import Admin from "../components/Admin";

const Calendario = () => {

    const currentRole = useSelector(state => state.user.currentRole);

    const PageByRole = () => {
        if (currentRole === 'instructor')
            return <Instructor />;
        else if (currentRole === 'admin')
            return <Admin />;
        else
            return <Client />;

    }

    return <PageByRole />;
};
    
export default Calendario;

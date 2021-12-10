import { useSelector } from 'react-redux';
import Student from "./student";
import Instructor from "./instructor";
import Admin from "./admin";

const Calendario = () => {

    const user = useSelector(state => state.user.user);

    const PageByRole = () => {
        if (user.instructorID)
            return <Instructor />;
        else
            return <Student />;
    }

    return (
        <PageByRole />
    );
};
    
export default Calendario;

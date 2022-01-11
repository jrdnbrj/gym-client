import { useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import Client from "../components/Client";
import Instructor from "../components/Instructor";
import Admin from "../components/Admin";
import Loading from "../components/Loading";

import weekScheduleAll from "../graphql/query/weekScheduleAll";

import Spinner from "react-bootstrap/Spinner";


const Calendario = () => {

    const currentRole = useSelector(state => state.user.currentRole);

    const { loading, error, data, refetch } = useQuery(weekScheduleAll);

    error && console.log("weekScheduleAll Error:", error);
    data && console.log("weekScheduleAll Data:", data);

    const PageByRole = () => {
        if (loading && !data) 
            return <Loading name="Calendario" />;

        if (currentRole === 'instructor')
            return <Instructor classes={data.weekScheduleAll} />;
        else if (currentRole === 'admin')
            return <Admin classes={data.weekScheduleAll} refetch={refetch} />;
        else
            return <Client classes={data.weekScheduleAll} refetch={refetch} />;

    }

    return <PageByRole />;
};
    
export default Calendario;

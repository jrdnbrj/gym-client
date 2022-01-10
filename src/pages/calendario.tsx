import { useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import Client from "../components/Client";
import Instructor from "../components/Instructor";
import Admin from "../components/Admin";

import weekScheduleAll from "../graphql/query/weekScheduleAll";

import Spinner from "react-bootstrap/Spinner";


const Calendario = () => {

    const currentRole = useSelector(state => state.user.currentRole);

    const { loading, error, data, refetch } = useQuery(weekScheduleAll);

    error && console.log("weekScheduleAll Error:", error);
    data && console.log("weekScheduleAll Data:", data);

    const PageByRole = () => {
        if (loading && !data) 
            return <div className="loading-calendar">
                <Spinner animation="border" />
                <span>Cargando Calendario...</span>
            </div>;

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

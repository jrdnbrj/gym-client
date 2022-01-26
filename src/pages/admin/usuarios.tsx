import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useQuery, useMutation } from "@apollo/client";
import userAll from "../../graphql/query/userAll";
import adminUserRoles from "../../graphql/mutation/adminUserRoles";
import weekScheduleAll from "../../graphql/query/weekScheduleAll";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import Loading from "../../components/Loading";
import UsersList from "../../components/UsersList"
import RegisterPayment from "../../components/RegisterPayment";
import RegisterHealthRecords from "../../components/RegisterHealthRecords";


const usuarios = ({ role }) => {

    const router = useRouter();

    const { loading, error, data, refetch } = useQuery(userAll);
    const { loading: loadingClasses, data: dataClasses } = useQuery(weekScheduleAll);

    useEffect(() => {
        if (role === "client")
            router.push("/calendario"); 
    }, [role]);

    if (loading)
        return <Loading name="Usuarios" />;

    if (loadingClasses)
        return <Loading name="Clases" />;

    return (
        <>
            {role === "admin" && 
                <>
                    <UsersList 
                        users={data?.userAll} 
                        refetchUsers={refetch}
                    />
                    <RegisterPayment 
                        users={data?.userAll}
                        classes={dataClasses?.weekScheduleAll}
                    />
                </>}
            {(role === "admin" || role === "instructor") && 
                <RegisterHealthRecords
                    users={data?.userAll}
                />}
        </>
    )
}


export default usuarios;
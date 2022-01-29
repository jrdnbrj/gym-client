import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { useQuery, useMutation } from "@apollo/client";
import userAll from "../../graphql/query/userAll";
import workoutTypeAll from "../../graphql/query/workoutTypeAll";
import weekScheduleAll from "../../graphql/query/weekScheduleAll";
import receiptAll from "../../graphql/query/receiptAll";

import WeekSchedules from "../../components/WeekSchedules";
import WorkoutTypes from "../../components/WorkoutTypes";
import Receipts from "../../components/Receipts";
import Loading from "../../components/Loading";


const clases = ({ role }) => {

    const router = useRouter();

    const { data, loading, refetch } = useQuery(workoutTypeAll);
    const { data: users, loading: loadingUsers } = useQuery(userAll);
    const { 
        loading: loadingClasses, 
        data: dataClasses, 
        refetch: refetchClasses 
    } = useQuery(weekScheduleAll);
    const { data: receipts, loading: loadingReceipts } = useQuery(receiptAll);

    useEffect(() => {
        if (role !== "admin")
            router.push("/calendario"); 
    }, [role]);

    if (loading)
        return <Loading name="Tipos de Clases" />;

    if (loadingUsers)
        return <Loading name="Usuarios" />;

    if (loadingClasses)
        return <Loading name="Clases" />;

    if (loadingReceipts)
        return <Loading name="Comprobantes de Pago" />;

    return (
        <Container>
            <WorkoutTypes 
                workoutTypes={data?.workoutTypeAll}
                refetchTypes={refetch} 
                refetchClasses={refetchClasses} 
            />
            <WeekSchedules 
                workoutTypes={data?.workoutTypeAll}
                refetchClasses={refetchClasses} 
                classes={dataClasses?.weekScheduleAll}
                instructors={users?.userAll?.filter(user => user.isInstructor)}
            />
            <Receipts receipts={receipts?.receiptAll} />
        </Container>
    );
}


export default clases;
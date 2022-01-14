import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { useQuery, useMutation } from "@apollo/client";
import userAll from "../../graphql/query/userAll";
import workoutTypeAll from "../../graphql/query/workoutTypeAll";
import weekScheduleAll from "../../graphql/query/weekScheduleAll";

import WeekSchedules from "../../components/WeekSchedules";
import WorkoutTypes from "../../components/WorkoutTypes";
import Loading from "../../components/Loading";


const clases = () => {

    const router = useRouter();

    const currentRole = useSelector(state => state.user.currentRole);

    const { data, loading, refetch } = useQuery(workoutTypeAll);
    const { data: users, loading: loadingUsers } = useQuery(userAll);
    const { loading: loadingClasses, data: dataClasses, refetch: refetchClasses } = useQuery(weekScheduleAll);

    // useEffect(() => {
    //     if (currentRole !== "admin")
    //         router.push("/calendario"); 
    // }, [currentRole]);

    if (loading)
        return <Loading name="Tipos de Clases" />;

    if (loadingUsers)
        return <Loading name="Usuarios" />;

    if (loadingClasses)
        return <Loading name="Clases" />;

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
        </Container>
    );
}


export default clases;
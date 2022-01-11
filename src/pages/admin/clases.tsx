import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import { useQuery, useMutation } from "@apollo/client";
import userAll from "../../graphql/query/userAll";
import workoutTypeAll from "../../graphql/query/workoutTypeAll";

import CreateClass from "../../components/CreateClass";
import WorkoutTypes from "../../components/WorkoutTypes";
import Loading from "../../components/Loading";


const clases = () => {

    const router = useRouter();

    const currentRole = useSelector(state => state.user.currentRole);

    const { data, loading, refetch } = useQuery(workoutTypeAll);
    const { data: users, loading: loadingUsers } = useQuery(userAll);

    useEffect(() => {
        if (currentRole !== "admin")
            router.push("/calendario"); 
    }, [currentRole]);

    if (loading)
        return <Loading name="Tipos de Clases" />;

    if (loadingUsers)
        return <Loading name="Usuarios" />;

    return (
        <Container>
            <WorkoutTypes 
                workoutTypes={data?.workoutTypeAll}
                refetchTypes={refetch} 
            />
            <CreateClass 
                workoutTypes={data?.workoutTypeAll}
                refetchTypes={refetch} 
                instructors={users?.userAll?.filter(user => user.isInstructor)}
            />
        </Container>
    );
}


export default clases;
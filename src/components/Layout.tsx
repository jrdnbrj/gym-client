import { useEffect } from "react";
import Script from 'next/script'

import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import Header from "./Header";
import userMe from "../graphql/query/userMe";

const Layout = ({ Component, pageProps, children }) => {

    const dispatch = useDispatch();
    const { data } = useQuery(userMe);

    const role = useSelector(state => state.user.currentRole);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if (!data?.userMe) return null

        dispatch({ 
            type: "SET_USER", 
            user: {
                id: data?.userMe.id,
                firstName: data?.userMe.firstName,
                lastName: data?.userMe.lastName,
                email: data?.userMe.email,
                isClient: data?.userMe.isClient,
                isInstructor: data?.userMe.isInstructor,
                isAdmin: data?.userMe.isAdmin,
            }
        });
        
        if (data?.userMe.isInstructor)
            dispatch({ type: "SET_CURRENT_ROLE", payload: "instructor" });
    }, [data]);

    const appProps = { user, role };

    return <>
        <Script src='https://meet.jit.si/external_api.js' />
        <Header {...appProps} />
        <Component {...pageProps} {...appProps} />
    </>;
}

export default Layout;

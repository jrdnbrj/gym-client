import { store } from "../redux/index";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { client } from "../apolloClient";
import { ApolloProvider } from "@apollo/client/react";

import Layout from "../components/Layout";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/styles.css";


const MyApp = ({ Component, pageProps }): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Layout Component={Component} pageProps={pageProps} />
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;

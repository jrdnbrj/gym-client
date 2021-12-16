import { Provider } from "react-redux";
import { store } from "../redux/index";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../apolloClient";
import { AppProps } from "next/app";
import Layout from "../components/Layout";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/styles.css";

// TODO: Use the same tsconfig.json in server and client for
// consistency.
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;

import { Provider } from "react-redux";
import { store } from "../redux/index";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "../apolloClient";
import { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.css";

// TODO: Use the same tsconfig.json in server and client for
// consistency.
const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ApolloProvider>
    );
};

export default MyApp;

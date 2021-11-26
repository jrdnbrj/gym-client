import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const productionURL = "http://localhost:8000/gql";
const developmentURL = "http://localhost:8000/gql";

const httpLink = createHttpLink({
    uri: process.env.NODE_ENV === "production" ? productionURL : developmentURL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token ? token : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// TODO: credentials 'include' might be insecure
export const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:8000/graphql",
        credentials: "include",
    }),
    cache: new InMemoryCache(),
});

import gql from "graphql-tag";

const logoutMutation = gql`
    mutation {
        userLogout
    }
`;

export default logoutMutation;

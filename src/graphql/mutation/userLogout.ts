import gql from "graphql-tag";

const userLogout = gql`
    mutation {
        userLogout
    }
`;

export default userLogout;

import gql from "graphql-tag";

const userLogin = gql`
    mutation ($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            id
            firstName
            lastName
            email
        }
    }
`;

export default userLogin;

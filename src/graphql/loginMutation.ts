import gql from "graphql-tag";

const loginMutation = gql`
    mutation ($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            id
            firstName
            lastName
            email
        }
    }
`;

export default loginMutation;

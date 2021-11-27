import gql from "graphql-tag";

const loginMutation = gql`
    mutation ($email: String!, $password: String!) {
        userRegister(email: $email, password: $password) {
            id
            firstName
            lastName
            email
        }
    }
`;

export default loginMutation;

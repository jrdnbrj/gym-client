import gql from "graphql-tag";

const registerMutation = gql`
    mutation (
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ) {
        userRegister(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            id
            firstName
            lastName
            email
        }
    }
`;

export default registerMutation;

import gql from "graphql-tag";

const registerMutation = gql`
    mutation (
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        $isClient: Boolean!
        $isInstructor: Boolean!
    ) {
        userRegister(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            isClient: $isClient
            isInstructor: $isInstructor
        ) {
            id
            firstName
            lastName
            email
        }
    }
`;

export default registerMutation;

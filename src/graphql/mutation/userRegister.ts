import gql from "graphql-tag";

const userRegister = gql`
    mutation (
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        $isClient: Boolean!
        $isInstructor: Boolean!
        $isAdmin: Boolean!
    ) {
        userRegister(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            isClient: $isClient
            isInstructor: $isInstructor
            isAdmin: $isAdmin
        ) {
            id
            firstName
            lastName
            email
        }
    }
`;

export default userRegister;

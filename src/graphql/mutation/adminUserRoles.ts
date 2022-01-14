import gql from "graphql-tag";

const adminUserRoles = gql`
    mutation (
        $userID: ID!, $isClient: Boolean!, 
        $isInstructor: Boolean!, $isAdmin: Boolean!
    ) {
        adminUserRoles(
            userID: $userID, isClient: $isClient, 
            isInstructor: $isInstructor, isAdmin: $isAdmin
        ) {
            firstName
            isClient
            isInstructor
            isAdmin
        }
    }
`;

export default adminUserRoles;

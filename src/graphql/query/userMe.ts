import gql from "graphql-tag";

const userMe = gql`
    {
        userMe {
            id
            firstName
            lastName
            email
            isClient
            isInstructor
            isAdmin
        }
    }
`;

export default userMe;

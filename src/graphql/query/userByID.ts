import gql from "graphql-tag";

const userByID = gql`
    query ($userID: ID!) {
        userByID(userID: $userID) {
            firstName
            lastName
            email
        }
    }
`;

export default userByID;

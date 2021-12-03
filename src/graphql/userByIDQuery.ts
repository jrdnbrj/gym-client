import gql from "graphql-tag";

const weekScheduleAllMutation = gql`
    query ($userID: ID!) {
        userByID(userID: $userID) {
            firstName
            lastName
            email
        }
    }
`;

export default weekScheduleAllMutation;

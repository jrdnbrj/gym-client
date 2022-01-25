import gql from "graphql-tag";

const weekScheduleRemove = gql`
    mutation ($weekScheduleID: ID!) {
        weekScheduleRemove (weekScheduleID: $weekScheduleID)
    }
`;

export default weekScheduleRemove;

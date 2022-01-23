import gql from "graphql-tag";

const clientRemoveReservation = gql`
    mutation ($weekScheduleID: ID!) {
        clientRemoveReservation(weekScheduleID: $weekScheduleID)
    }
`;

export default clientRemoveReservation;

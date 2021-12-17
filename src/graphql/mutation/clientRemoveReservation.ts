import gql from "graphql-tag";

const clientRemoveReservation = gql`
    mutation ($weekScheduleID: Float!) {
        clientRemoveReservation(weekScheduleID: $weekScheduleID)
    }
`;

export default clientRemoveReservation;

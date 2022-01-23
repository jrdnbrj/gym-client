import gql from "graphql-tag";

const clientHasPaidForWeekSchedule = gql`
    query ($weekScheduleID: ID!, $clientID: ID!) {
        clientHasPaidForWeekSchedule(
            weekScheduleID: $weekScheduleID, 
            clientID: $clientID
        )
    }
`;

export default clientHasPaidForWeekSchedule;

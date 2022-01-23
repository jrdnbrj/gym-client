import gql from "graphql-tag";

const attendanceRecordSetAssisted = gql`
    mutation ($weekScheduleID: ID!, $notAssistedIDs: [ID!]!) {
        attendanceRecordSetAssisted(
            weekScheduleID: $weekScheduleID, 
            notAssistedIDs: $notAssistedIDs
        ) {
            date
        }
    }
`;

export default attendanceRecordSetAssisted;

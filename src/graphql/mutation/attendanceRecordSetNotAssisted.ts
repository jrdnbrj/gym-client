import gql from "graphql-tag";

const attendanceRecordSetNotAssisted = gql`
    mutation ($weekScheduleID: Float!, $notAssistedIDs: [ID!]!) {
        attendanceRecordSetNotAssisted(
            weekScheduleID: $weekScheduleID, 
            notAssistedIDs: $notAssistedIDs
        ) {
            date
        }
    }
`;

export default attendanceRecordSetNotAssisted;

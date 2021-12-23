import gql from "graphql-tag";

const attendanceRecordSetNotAssisted = gql`
    mutation ($weekScheduleID: Float!, $notAssistedIDs: [Float!]!) {
        attendanceRecordSetNotAssisted(
            weekScheduleID: $weekScheduleID, 
            notAssistedIDs: $notAssistedIDs
        ) {
            date
        }
    }
`;

export default attendanceRecordSetNotAssisted;

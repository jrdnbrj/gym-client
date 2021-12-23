import gql from "graphql-tag";

const attendanceRecordSetAssisted = gql`
    mutation ($weekScheduleID: Float!, $notAssistedIDs: [Float!]!) {
        attendanceRecordSetAssisted(
            weekScheduleID: $weekScheduleID, 
            notAssistedIDs: $notAssistedIDs
        ) {
            date
        }
    }
`;

export default attendanceRecordSetAssisted;

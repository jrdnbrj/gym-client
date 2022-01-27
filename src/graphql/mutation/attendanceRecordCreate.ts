import gql from "graphql-tag";

const attendanceRecordCreate = gql`
    mutation ($weekScheduleID: ID!) {
        attendanceRecordCreate(weekScheduleID: $weekScheduleID) {
            date
            attendance {
                studentID
                attended
            }
        }
    }
`;

export default attendanceRecordCreate;

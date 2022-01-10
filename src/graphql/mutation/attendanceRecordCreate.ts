import gql from "graphql-tag";

const attendanceRecordCreate = gql`
    mutation ($weekScheduleID: Float!) {
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

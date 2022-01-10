import gql from "graphql-tag";

const attendanceRecordAll = gql`
    query {
        attendanceRecordAll {
            weekSchedule {
                id
                students {
                    firstName
                }
            }
            date
            attendance {
                studentID
                attended
            }
        }
    }
`;

export default attendanceRecordAll;

import gql from "graphql-tag";

const attendanceRecordAll = gql`
    query {
        attendanceRecordAll {
            weekSchedule {
                id
                startDate
                workoutType
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

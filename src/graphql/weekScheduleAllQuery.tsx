import gql from "graphql-tag";

const weekScheduleAllMutation = gql`
    query {
        weekScheduleAll {
            id
            workoutType
            quotas
            students {
                id
                userID
            }
            instructor {
                id
                userID
            }
            days
            startDate
        }
    }
`;

export default weekScheduleAllMutation;

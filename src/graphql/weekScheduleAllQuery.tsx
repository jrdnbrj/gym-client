import gql from "graphql-tag";

const weekScheduleAllMutation = gql`
    query {
        weekScheduleAll {
            id
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

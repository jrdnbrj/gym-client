import gql from "graphql-tag";

const weekScheduleAll = gql`
    query {
        weekScheduleAll {
            id
            workoutType {
                name
                emoji
            }
            price
            quotas
            days
            startDate
            students {
                id
                firstName
                lastName
            }
            instructor {
                id
                firstName
                lastName
            }
        }
    }
`;

export default weekScheduleAll;

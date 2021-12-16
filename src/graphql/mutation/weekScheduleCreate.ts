import gql from "graphql-tag";

const weekScheduleCreate = gql`
    mutation (
        $type: WorkoutType!,
        $instructorID: ID!,
        $startDate: DateInput!, 
        $weekDays: [Weekday!]!,
    ) {
        weekScheduleCreate(
            type: $type,
            instructorID: $instructorID
            startDate: $startDate
            weekDays: $weekDays
        ) {
            id
            quotas
            students {
                id
                firstName
            }
            instructor {
                id
                firstName
            }
            days
            startDate
        }
    }
`;

export default weekScheduleCreate;

import gql from "graphql-tag";

const weekScheduleCreate = gql`
    mutation (
        $type: String!,
        $instructorID: ID!,
        $startDate: DateTime!, 
        $weekDays: [Weekday!]!,
        $price: Float!,
    ) {
        weekScheduleCreate(
            type: $type,
            instructorID: $instructorID
            startDate: $startDate
            weekDays: $weekDays
            price: $price
        ) {
            id
        }
    }
`;

export default weekScheduleCreate;

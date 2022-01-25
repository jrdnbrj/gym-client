import gql from "graphql-tag";

const weekScheduleEdit = gql`
    mutation (
        $weekScheduleID: ID!,
        $workoutTypeName: String,
        $instructorID: ID,
        $startDate: DateTime, 
        $days: [Weekday!],
        $price: Float,
    ) {
        weekScheduleEdit(
            weekScheduleID: $weekScheduleID,
            workoutTypeName: $workoutTypeName,
            instructorID: $instructorID
            startDate: $startDate
            days: $days
            price: $price
        ) {
            id
        }
    }
`;

export default weekScheduleEdit;

import gql from "graphql-tag";

const clientReceiptsFrom = gql`
    query ($weekScheduleID: ID, $clientID: ID!, $monthDate: DateTime) {
        clientReceiptsFrom(
            weekScheduleID: $weekScheduleID, 
            clientID: $clientID, 
            monthDate: $monthDate
        ) {
            id
            transactionDate
            workoutTypeName
            paidForMonthsDates
            totalAmount
        }
    }
`;

export default clientReceiptsFrom;

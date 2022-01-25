import gql from "graphql-tag";

const clientReceiptFrom = gql`
    query ($weekScheduleID: ID, $clientID: ID!, $monthDate: DateTime) {
        clientReceiptFrom(
            weekScheduleID: $weekScheduleID, 
            clientID: $clientID, 
            monthDate: $monthDate
        ) {
            transactionDate
            workoutTypeName
            paidForMonthsDates
            totalAmount
        }
    }
`;

export default clientReceiptFrom;

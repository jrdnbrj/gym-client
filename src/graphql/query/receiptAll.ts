import gql from "graphql-tag";

const receiptAll = gql`
    query {
        receiptAll {
            id
            transactionDate
            clientID
            clientEmail
            weekScheduleID
            weekScheduleID
            workoutTypeName
            paidForMonthsDates
            totalAmount
        }
    }
`;

export default receiptAll;

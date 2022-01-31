import gql from "graphql-tag";

const receiptAll = gql`
    query {
        receiptAll {
            id
            transactionDate
            clientID
            clientFullName
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

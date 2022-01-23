import gql from "graphql-tag";

const adminSubmitPayment = gql`
    mutation ($clientID: ID!, $weekScheduleID: ID!, $months: Int) {
        adminSubmitPayment(clientID: $clientID, weekScheduleID: $weekScheduleID, months: $months) {
            transactionDate
            clientID
            clientEmail
            weekScheduleID
            paidForMonthsDates
            totalAmount
        }
    }
`;

export default adminSubmitPayment;

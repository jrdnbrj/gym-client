import gql from "graphql-tag";

const instructorSendEmailWeekSchedule = gql`
    mutation ($weekScheduleID: Float!, $message: String!) {
        instructorSendEmailWeekSchedule(
            weekScheduleID: $weekScheduleID, 
            message: $message
        )
    }
`;

export default instructorSendEmailWeekSchedule;

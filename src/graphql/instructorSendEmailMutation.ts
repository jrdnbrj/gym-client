import gql from "graphql-tag";

const instructorSendEmailMutation = gql`
    mutation ($weekScheduleID: Float!, $message: String!) {
        instructorSendEmailWeekSchedule(
            weekScheduleID: $weekScheduleID, 
            message: $message
        )
    }
`;

export default instructorSendEmailMutation;

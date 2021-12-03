import gql from "graphql-tag";

const bookClassMutation = gql`
    mutation (
        $clientID: ID!, 
        $weekScheduleID: ID!
    ) {
        weekScheduleAddStudent(
            clientID: $clientID, 
            weekScheduleID: $weekScheduleID
        ) {
            id
        }
    }
`;

export default bookClassMutation;

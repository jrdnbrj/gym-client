import gql from "graphql-tag";

const weekScheduleAddStudent = gql`
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

export default weekScheduleAddStudent;

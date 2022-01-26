import gql from "graphql-tag";

const healthRecordCreate = gql`
    mutation (
        $clientID: ID!,
        $weight: Float!,
        $height: Float!,
        $pulse: Int!,
        $systolicPressure: Int!,
        $diastolicPressure: Int!,
    ) {
        healthRecordCreate(
            clientID: $clientID,
            weight: $weight,
            height: $height,
            pulse: $pulse,
            systolicPressure: $systolicPressure,
            diastolicPressure: $diastolicPressure,
        ) {
            takenAt
        }
    }
`;

export default healthRecordCreate;

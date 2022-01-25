import gql from "graphql-tag";

const userMe = gql`
    {
        userMe {
            id
            firstName
            lastName
            email
            isClient
            isInstructor
            isAdmin
            client {
                healthRecords {
                    id
                    takenAt
                    takenBy {
                        firstName
                        lastName
                    }
                    weight
                    height
                    pulse
                    systolicPressure
                    diastolicPressure
                }
            }
        }
    }
`;

export default userMe;

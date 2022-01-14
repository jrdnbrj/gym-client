import gql from "graphql-tag";

const userAll = gql`
    query {
        userAll {
            id
            firstName
            lastName
            isClient
            isInstructor
            isAdmin
            instructor {
                weekSchedules {
                    id
                }
            }
        }
    }
`;

export default userAll;

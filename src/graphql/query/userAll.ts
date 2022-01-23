import gql from "graphql-tag";

const userAll = gql`
    query {
        userAll {
            id
            firstName
            lastName
            email
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

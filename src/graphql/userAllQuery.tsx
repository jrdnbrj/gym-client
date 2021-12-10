import gql from "graphql-tag";

const userAllQuery = gql`
    query {
        userAll {
            id
            firstName
            lastName
            client {
                weekScheduleIDs
            }
            instructor {
                weekScheduleIDs
            }
        }
    }
`;

export default userAllQuery;

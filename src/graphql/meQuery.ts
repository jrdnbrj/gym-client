import gql from "graphql-tag";

const meQuery = gql`
    {
        userMe {
            id
            firstName
            lastName
            email
            client {
                id
            }
            instructor {
                id
            }
        }
    }
`;

export default meQuery;

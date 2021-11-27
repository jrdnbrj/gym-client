import gql from "graphql-tag";

const meQuery = gql`
    {
        userMe {
            id
            firstName
            lastName
            email
        }
    }
`;

export default meQuery;

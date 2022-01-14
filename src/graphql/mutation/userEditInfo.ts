import gql from "graphql-tag";

const userEditInfo = gql`
    mutation ($firstName: String!, $lastName: String!, $email: String!) {
        userEditInfo(firstName: $firstName, lastName: $lastName, email: $email) {
            firstName
            lastName
            email
        } 
    }
`;

export default userEditInfo;

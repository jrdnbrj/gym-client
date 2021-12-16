import gql from "graphql-tag";

const userForgotPassword = gql`
    mutation ($userEmail: String!) {
        userForgotPassword(userEmail: $userEmail) 
    }
`;

export default userForgotPassword;

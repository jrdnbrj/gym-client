import gql from "graphql-tag";

const forgotPasswordMutation = gql`
    mutation ($userEmail: String!) {
        userForgotPassword(userEmail: $userEmail) 
    }
`;

export default forgotPasswordMutation;

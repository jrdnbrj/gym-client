import gql from "graphql-tag";

const changePasswordMutation = gql`
    mutation ($newPassword: String!, $token: String!) {
        userChangePassword(newPassword: $newPassword, token: $token)
    }
`;

export default changePasswordMutation;

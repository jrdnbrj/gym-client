import gql from "graphql-tag";

const userChangePassword = gql`
    mutation ($newPassword: String!, $token: String!) {
        userChangePassword(newPassword: $newPassword, token: $token)
    }
`;

export default userChangePassword;

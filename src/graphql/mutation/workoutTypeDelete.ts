import gql from "graphql-tag";

const workoutTypeDelete = gql`
    mutation ($name: String!) {
        workoutTypeDelete(name: $name)
    }
`;

export default workoutTypeDelete;

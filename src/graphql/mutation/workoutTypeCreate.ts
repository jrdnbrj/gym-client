import gql from "graphql-tag";

const workoutTypeCreate = gql`
    mutation ($name: String!, $emoji: String!) {
        workoutTypeCreate(name: $name, emoji: $emoji) {
            name
            emoji
        }
    }
`;

export default workoutTypeCreate;

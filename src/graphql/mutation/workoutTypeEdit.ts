import gql from "graphql-tag";

const workoutTypeEdit = gql`
    mutation ($originalName: String!, $newName: String, $newEmoji: String) {
        workoutTypeEdit(originalName: $originalName, newName: $newName, newEmoji: $newEmoji) {
            name
            emoji
        }
    }
`;

export default workoutTypeEdit;

import gql from "graphql-tag";

const workoutTypeAll = gql`
    query {
        workoutTypeAll {
            name
            emoji
        }
    }
`;

export default workoutTypeAll;

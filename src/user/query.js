import { gql } from "apollo-boost";

export const ME = gql`
    {
        me {
            _id, first_name, last_name
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            _id
        }
    }
`;

export const AUTHENTICATE = gql`
    mutation Authenticate($email: String!, $password: String!) {
        authenticate(email: $email, password: $password) {
            token
        }
    }
`;

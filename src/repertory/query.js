import { gql } from "apollo-boost";

export const CONTACTS = gql`
    {
        contacts  {
            _id, first_name, last_name,
            email, country_code, phone_number
        }
    }
`;

export const CONTACT = gql`
    query Contact($_id: ID!){
        contact(_id: $_id)  {
            _id, first_name, last_name,
            email, country_code, phone_number, in_favorites
        }
    }
`;
 
export const CREATE_CONTACT = gql`
    mutation CreateContact(
        $last_name: String!, $first_name: String!,
        $email: String, $country_code: Int, $phone_number: String
    ) {
            createContact(
                last_name: $last_name, first_name: $first_name, email: $email,
                country_code: $country_code, phone_number: $phone_number
            ) {
                _id
            }
        }
`;

export const UPDATE_CONTACT = gql`
    mutation UpdateContact(
        $_id: ID!, $last_name: String, $first_name: String,
        $email: String, $country_code: Int, $phone_number: String
    ) {
            updateContact(
                _id: $_id, last_name: $last_name, first_name: $first_name, email: $email,
                country_code: $country_code, phone_number: $phone_number
            ) {
                _id
            }
        }
`;

export const DELETE_CONTACT = gql`
    mutation DeleteContact($_id: ID!) {
        deleteContact(_id: $_id) {
            _id
        }
    }
`;

export const ADD_TO_FAVORITES = gql`
    mutation AddToFavorites($_id: ID!) {
        addToFavorites(_id: $_id) {
            _id
        }
    }
`;

export const REMOVE_FROM_FAVORITES = gql`
    mutation RemoveFromFavorites($_id: ID!) {
        removeFromFavorites(_id: $_id) {
            _id
        }
    }
`;
import { gql } from '@apollo/client';

// Fetch all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

// Fetch a single user by ID
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

// Fetch the current logged-in user
export const GET_ME = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      email
    }
  }
`;

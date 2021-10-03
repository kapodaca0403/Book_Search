import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      toekn
      user {
        _id
        username
      }
    }
  }
`;

// ask for assistance
export const SAVED_BOOK = gql`
input savedBooks()
`;

export const REMOVE_BOOK = gql``;

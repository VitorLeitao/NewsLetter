import { gql } from "@apollo/client";

export const GET_USER_BY_NAME = gql`
  query getUserByName($username: String!) {
    getUserByName(username: $username) {
        id
        name
        email
        password
    }
  }
`;

export const GET_ALL_USER = gql`
  query getAllUser {
    getAllUser {
      id
      name
      email
      password
    }
  }
`;
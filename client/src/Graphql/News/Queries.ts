import { gql } from "@apollo/client";

export const getAllNews = gql`
  query getAllUsers {
    getAllUsers {
      id
      title
      description
      date
      authorId
    }
  }
`;
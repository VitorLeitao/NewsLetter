import { gql } from "@apollo/client";

export const GET_ALL_NEWS = gql`
  query getAllNews {
    getAllNews{
      id
      title
      description
      date
      author
    }
  }
`;
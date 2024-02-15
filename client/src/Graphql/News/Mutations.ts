import { gql } from "@apollo/client";

export const CREATE_NEW = gql`
  mutation createNew($title: String!, $description: String!, $date: String!, $authorId: Int!) {
    createNew(title: $title, description: $description, date: $date, authorId: $authorId) {
      id
      title
      description
      date
      author
    }
  }
`;

export const UPDATE_TITLE = gql`
  mutation updateTitle(
    $id: Int!
    $title: String!
  ) {
    updateTitle(
      id: $id
      title: $title
    ) {
      message
    }
  }
`;

export const UPDATE_DESCRIPTION = gql`
  mutation updateDescription(
    $id: Int!
    $description: String!
  ) {
    updateDescription(
      id: $id
      description: $title
    ) {
      message
    }
  }
`;

export const DELETE_NEWS = gql`
  mutation deleteNews($id: Int!, $password: String!) {
    deleteNews(id: $id, password: $password) {
      message
    }
  }
`;

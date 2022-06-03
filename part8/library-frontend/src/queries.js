import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql `
  query {
    allBooks {
      title
      published
      author
    }
  }
`

export const ADD_BOOK = gql `
  mutation insertBook( $title: String!, $year: Int!, $author: String!, $genres: [String!]! ){
    addBook (
      title: $title,
      published: $year,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql `
  mutation updateAuthor ( $name: String!, $born: Int! ) {
    editAuthor(
      name: $name
      born: $born
    ) {
      name
      born
    }
  }
`
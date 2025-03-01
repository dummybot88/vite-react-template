import { gql } from 'graphql-request'

export const fetchComics = gql`
  query fetchComics {
    fetchComics {
      comics {
        title
        poster
      }
    }
  }
`

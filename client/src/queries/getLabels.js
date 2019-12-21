import gql from 'graphql-tag'

const GET_LABELS = gql`
   query {
      labels {
         id
         title
         todos_count
         createdAt
         updatedAt
      }
   }
`

export default GET_LABELS

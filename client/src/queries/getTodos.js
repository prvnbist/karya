import gql from 'graphql-tag'

const GET_TODOS = gql`
   query {
      todos {
         id
         tags
         title
         createdAt
         updatedAt
      }
   }
`

export default GET_TODOS

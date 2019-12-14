const { gql } = require('apollo-server')

module.exports = gql`
   type Mutation {
      addTodo(title: String!): Result
      deleteTodo(id: ID!): Result
      renameTodo(id: ID!, title: String!): Result
   }
`

const { gql } = require('apollo-server')

module.exports = gql`
   type Mutation {
      addTodo(title: String!, labels: [String]!): Result
      deleteTodo(id: ID!): Result
      updateTodo(
         id: ID!
         title: String
         labels: [String]
         status: Status
      ): Result
   }
`

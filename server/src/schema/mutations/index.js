const { gql } = require('apollo-server')

module.exports = gql`
   type Mutation {
      addTodo(title: String!, tags: [String]!): Result
      deleteTodo(id: ID!): Result
      updateTodo(id: ID!, title: String, tags: [String], status: Status): Result
   }
`

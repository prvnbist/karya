const { gql } = require('apollo-server')

module.exports = gql`
   type Mutation {
      addTodo(title: String!, label: String): Result
      deleteTodo(id: ID!): Result
      updateTodo(id: ID!, title: String, label: String, status: Status): Result
   }
`

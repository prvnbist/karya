const { gql } = require('apollo-server')

module.exports = gql`
   type Mutation {
      addTodo(title: String!, label: String): TodoResult
      deleteTodo(id: ID!): TodoResult
      updateTodo(
         id: ID!
         title: String
         label: String
         status: Status
      ): TodoResult

      addLabel(title: String!): LabelResult
      deleteLabel(id: ID!): LabelResult
      updateLabel(id: ID!, title: String, todo: ID): LabelResult
   }
`

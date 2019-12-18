const { gql } = require('apollo-server')

module.exports = gql`
   type Todo {
      id: ID!
      title: String!
      label: String
      status: Status
      createdAt: String
      updatedAt: String
   }
   enum Status {
      TODO
      IN_PROGRESS
      DONE
   }
   type TodoSuccess {
      success: Boolean
      data: Todo
   }
   type Label {
      id: ID!
      title: String!
      todos: [Todo]!
      createdAt: String
      updatedAt: String
   }
   type LabelSuccess {
      success: Boolean
      data: Label
   }
   type Error {
      success: Boolean
      error: String
   }
   union TodoResult = TodoSuccess | Error
   union LabelResult = LabelSuccess | Error
`

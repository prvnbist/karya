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
   type Error {
      success: Boolean
      error: String
   }
   union TodoResult = TodoSuccess | Error
`

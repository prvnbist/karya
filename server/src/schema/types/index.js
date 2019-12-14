const { gql } = require("apollo-server");

module.exports = gql`
  type Todo {
    id: ID!
    title: String!
  }
  type Success {
    success: Boolean
    data: Todo
  }
  type Error {
    success: Boolean
    error: String
  }
  union Result = Success | Error
`;

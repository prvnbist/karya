const { gql } = require("apollo-server");

module.exports = gql`
  type Mutation {
    addTodo(title: String): String
  }
`;

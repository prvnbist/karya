const { gql } = require("apollo-server");

module.exports = gql`
  type Todo {
    id: ID!
    title: String!
  }
`;

const { gql } = require('apollo-server')

module.exports = gql`
   type Query {
      todos: [Todo]!
   }
`

const { makeExecutableSchema } = require("apollo-server");

const types = require("./types");
const queries = require("./queries");
const mutations = require("./mutations");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs: [types, queries, mutations],
  resolvers
});

module.exports = schema;

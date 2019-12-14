const { makeExecutableSchema } = require("apollo-server");

const types = require("./types");
const queries = require("./queries");
const mutations = require("./mutations");

const schema = makeExecutableSchema({
  typeDefs: [types, queries, mutations]
});

module.exports = schema;

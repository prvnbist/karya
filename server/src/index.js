const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const schema = require("./schema");

mongoose
  .connect("mongodb://localhost:27017/todo-app", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("💾 Connected to DB"))
  .catch(err => console.error(err));

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const Todo = require("../../models/Todo");

const resolvers = {
  Result: {
    __resolveType: type => {
      if (type.error) return "Error";
      return "Success";
    }
  },
  Mutation: {
    addTodo: async (_, { title }) => {
      try {
        const todo = await Todo.create({ title });
        return {
          success: true,
          data: todo
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        let result;
        await Todo.findByIdAndDelete(id, (error, todo) => {
          if (error) throw new Error(error);
          result = todo;
        });
        return {
          success: true,
          data: result
        };
      } catch (error) {
        return {
          success: false,
          error: error.message
        };
      }
    }
  }
};
module.exports = resolvers;

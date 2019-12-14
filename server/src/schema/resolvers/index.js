const Todo = require('../../models/Todo')

const resolvers = {
   Result: {
      __resolveType: type => {
         if (type.error) return 'Error'
         return 'Success'
      },
   },
   Query: {
      todos: async () => {
         try {
            const todos = await Todo.find()
            return todos
         } catch (error) {
            return error.message
         }
      },
   },
   Mutation: {
      addTodo: async (_, { title, tags }) => {
         try {
            const todo = await Todo.create({ title, tags })
            return {
               success: true,
               data: todo,
            }
         } catch (error) {
            return {
               success: false,
               error: error.message,
            }
         }
      },
      deleteTodo: async (_, { id }) => {
         try {
            let result
            await Todo.findByIdAndDelete(id, (error, todo) => {
               if (error) throw new Error(error)
               result = todo
            })
            return {
               success: true,
               data: result,
            }
         } catch (error) {
            return {
               success: false,
               error: error.message,
            }
         }
      },
      updateTodo: async (_, { id, ...args }) => {
         try {
            const update = {
               $set: {
                  ...(args.title && { title: args.title }),
                  ...(args.tags && { tags: args.tags }),
               },
            }
            const todo = Todo.findByIdAndUpdate(
               id,
               update,
               { new: true },
               (error, result) => {
                  if (error) throw new Error(error)
                  return result
               }
            )
            return {
               success: true,
               data: todo,
            }
         } catch (error) {
            return {
               success: false,
               error: error.message,
            }
         }
      },
   },
}
module.exports = resolvers

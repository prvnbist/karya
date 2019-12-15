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
            const todos = await Todo.find().sort({ createdAt: -1 })
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
            let newTags = []
            if (args.tags) {
               const { tags } = await Todo.findOne(
                  { _id: id },
                  (error, result) => {
                     if (error) throw new Error(error)
                     return result
                  }
               )
               newTags = await args.tags.filter(tag => !tags.includes(tag))
            }

            const update = {
               $set: {
                  ...(args.title && { title: args.title }),
                  ...(args.tags && { tags: [...tags, ...newTags] }),
                  ...(args.status && { status: args.status }),
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

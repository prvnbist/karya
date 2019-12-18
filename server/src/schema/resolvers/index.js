const Todo = require('../../models/Todo')
const Label = require('../../models/Label')

const resolvers = {
   TodoResult: {
      __resolveType: type => {
         if (type.error) return 'Error'
         return 'TodoSuccess'
      },
   },
   LabelResult: {
      __resolveType: type => {
         if (type.error) return 'Error'
         return 'LabelSuccess'
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
      labels: async () => {
         try {
            const labels = await Label.find().sort({ createdAt: -1 })
            return labels
         } catch (error) {
            return error.message
         }
      },
   },
   Mutation: {
      addTodo: async (_, { title, label }) => {
         try {
            const todo = await Todo.create({
               title,
               ...(label && { label }),
            })
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
            const data = {
               $set: {
                  ...(args.title && { title: args.title }),
                  ...(args.label && { label: args.label }),
                  ...(args.status && { status: args.status }),
               },
            }
            const todo = Todo.findByIdAndUpdate(
               id,
               data,
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
      addLabel: async (_, { title }) => {
         try {
            const label = await Label.create({
               title,
            })
            return {
               success: true,
               data: label,
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

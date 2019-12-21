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
            const labels = await Label.find()
               .populate('todos')
               .sort({ createdAt: -1 })
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
            label &&
               (await Label.findOneAndUpdate(
                  { title: label },
                  { $push: { todos: todo.id }, $inc: { todos_count: 1 } }
               ))
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
               async (error, result) => {
                  if (error) throw new Error(error)
                  if (args.label) {
                     const update = {
                        $push: { todos: result.id },
                        $inc: { todos_count: 1 },
                     }
                     await Label.findOneAndUpdate({ title: args.label }, update)
                  }
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
      deleteLabel: async (_, { id }) => {
         try {
            let result
            await Label.findByIdAndDelete(id, (error, label) => {
               if (error) throw new Error(error)
               result = label
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
      updateLabel: async (_, { id, ...args }) => {
         try {
            const update = {
               $set: {
                  ...(args.title && { title: args.title }),
               },
               ...(args.todo && { $push: { todos: args.todo } }),
               ...(args.todo && { $inc: { todos_count: 1 } }),
            }
            const label = await Label.findByIdAndUpdate(id, update, {
               new: true,
            }).populate('todos')
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

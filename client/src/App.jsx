import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

// Queries
import { GET_TODOS, ADD_TODO } from './queries'

const App = () => {
   const { loading, error, data } = useQuery(GET_TODOS)
   const [addTodo] = useMutation(ADD_TODO)
   const [todo, setTodo] = React.useState('')

   const submit = e => {
      e.preventDefault()
      addTodo({
         variables: {
            title: todo,
            tags: [],
         },
      })
   }

   if (loading) return 'Loading...'
   if (error) return `Error! ${error.message}`
   return (
      <div>
         <form onSubmit={submit}>
            <input
               type="text"
               value={todo}
               onChange={e => setTodo(e.target.value)}
            />
            <button type="submit">Add</button>
         </form>
         <ul>
            {data.todos.map(todo => (
               <li key={todo.id}>{todo.title}</li>
            ))}
         </ul>
      </div>
   )
}

export default App

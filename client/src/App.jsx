import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// Queries
import { GET_TODOS } from './queries'

const App = () => {
   const { loading, error, data } = useQuery(GET_TODOS)

   if (loading) return 'Loading...'
   if (error) return `Error! ${error.message}`
   return (
      <div>
         <ul>
            {data.todos.map(todo => (
               <li key={todo.id}>{todo.title}</li>
            ))}
         </ul>
      </div>
   )
}

export default App

import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

// Components
import { Todo, AddTodo } from './components'

// Queries
import { GET_TODOS } from './queries'

const App = () => {
   const { loading, error, data } = useQuery(GET_TODOS)

   if (loading) return 'Loading...'
   if (error) return `Error! ${error.message}`
   return (
      <Wrapper>
         <AddTodo />
         <ul>
            {data.todos.map(todo => (
               <Todo key={todo.id} todo={todo} />
            ))}
         </ul>
      </Wrapper>
   )
}

export default App

const Wrapper = styled.div`
   margin: 0 auto;
   max-width: 640px;
   padding: 0 16px;
   width: calc(100vw - 48px);
`

import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// State
import { Context } from '../../context'

// Components
import { Todo, AddTodo, EditTodo } from '../../components'

// Queries
import { GET_TODOS } from '../../queries'

// Styles
import { Wrapper, Heading, Empty } from './styles'

const Todos = () => {
   const { state, dispatch } = React.useContext(Context)
   const { loading, error, data } = useQuery(GET_TODOS)

   React.useEffect(() => {
      if (data?.todos) {
         data.todos.map(todo => {
            return dispatch({ type: todo.status, payload: todo })
         })
      }
   }, [data])

   if (loading) return 'Loading...'
   if (error) return `Error! ${error.message}`
   return (
      <Wrapper>
         {state.isEditing ? <EditTodo /> : <AddTodo />}
         <Heading title="IN PROGRESS">
            <span />
            IN PROGRESS
         </Heading>
         <ul>
            {state.todos.in_progress.length > 0 ? (
               state.todos.in_progress.map(todo => (
                  <Todo key={todo.id} todo={todo} />
               ))
            ) : (
               <Empty>
                  <span>No todos in progress.</span>
               </Empty>
            )}
         </ul>
         <Heading title="TODO">
            <span />
            TODO
         </Heading>
         <ul>
            {state.todos.todo.length > 0 ? (
               state.todos.todo.map(todo => <Todo key={todo.id} todo={todo} />)
            ) : (
               <Empty>
                  <span>All caught up.</span>
               </Empty>
            )}
         </ul>
         <Heading title="DONE">
            <span />
            DONE
         </Heading>
         <ul>
            {state.todos.done.length > 0 ? (
               state.todos.done.map(todo => <Todo key={todo.id} todo={todo} />)
            ) : (
               <Empty>
                  <span>Get them todos.</span>
               </Empty>
            )}
         </ul>
      </Wrapper>
   )
}

export default Todos

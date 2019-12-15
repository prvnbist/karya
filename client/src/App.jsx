import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

// Components
import { Todo, AddTodo, EditTodo } from './components'

// Queries
import { GET_TODOS } from './queries'

const initialState = {
   todo: [],
   in_progress: [],
   done: [],
}

const reducers = (state, action) => {
   switch (action.type) {
      case 'TODO':
         return {
            ...state,
            todo: [action.payload, ...state.todo],
         }
      case 'IN_PROGRESS':
         return {
            ...state,
            in_progress: [action.payload, ...state.in_progress],
         }
      case 'DONE':
         return {
            ...state,
            done: [action.payload, ...state.done],
         }
      default:
         return state
   }
}

const App = () => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   const { loading, error, data } = useQuery(GET_TODOS)
   const [editMode, setEditMode] = React.useState(null)
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
         {editMode ? (
            <EditTodo todo={editMode} setEditMode={setEditMode} />
         ) : (
            <AddTodo />
         )}
         <h3>IN PROGRESS</h3>
         <ul>
            {state.in_progress.map(todo => (
               <Todo key={todo.id} todo={todo} setEditMode={setEditMode} />
            ))}
         </ul>
         <h3>TODO</h3>
         <ul>
            {state.todo.map(todo => (
               <Todo key={todo.id} todo={todo} setEditMode={setEditMode} />
            ))}
         </ul>
         <h3>DONE</h3>
         <ul>
            {state.done.map(todo => (
               <Todo key={todo.id} todo={todo} setEditMode={setEditMode} />
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
   h3 {
      color: #bdb5b5;
      font-size: 14px;
      margin-bottom: 8px;
   }
   ul {
      margin-bottom: 16px;
   }
`

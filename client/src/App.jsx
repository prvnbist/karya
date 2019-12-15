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
         <h3 title="IN PROGRESS">
            <span />
            IN PROGRESS
         </h3>
         <ul>
            {state.in_progress.length > 0 ? (
               state.in_progress.map(todo => (
                  <Todo key={todo.id} todo={todo} setEditMode={setEditMode} />
               ))
            ) : (
               <Empty>
                  <span>No todos in progress.</span>
               </Empty>
            )}
         </ul>
         <h3 title="TODO">
            <span />
            TODO
         </h3>
         <ul>
            {state.todo.length > 0 ? (
               state.todo.map(todo => (
                  <Todo key={todo.id} todo={todo} setEditMode={setEditMode} />
               ))
            ) : (
               <Empty>
                  <span>All caught up.</span>
               </Empty>
            )}
         </ul>
         <h3 title="DONE">
            <span />
            DONE
         </h3>
         <ul>
            {state.done.length > 0 ? (
               state.done.map(todo => (
                  <Todo key={todo.id} todo={todo} setEditMode={setEditMode} />
               ))
            ) : (
               <Empty>
                  <span>Get them todos.</span>
               </Empty>
            )}
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
   > h3 {
      color: #fff;
      font-size: 14px;
      padding: 0 10px;
      height: 20px;
      line-height: 20px;
      margin-bottom: 8px;
      border-radius: 16px;
      display: inline-block;
      &:nth-of-type(1) {
         background: #5da6ff;
      }
      &:nth-of-type(2) {
         color: #585454;
         background: #f5e7e7;
      }
      &:nth-of-type(3) {
         background: #35da35;
      }
      span {
         width: 8px;
         height: 8px;
         margin-right: 2px;
         border-radius: 8px;
         background: #fff;
         display: inline-block;
         transform: translate(-3px, -1px);
         box-shadow: 1px 0 8px -0.5px rgba(0, 0, 0, 0.2);
      }
   }
   ul {
      margin-bottom: 16px;
   }
`

const Empty = styled.div`
   width: 100%;
   height: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 0 12px;
   position: relative;
   span {
      background: #fff;
      padding: 0 8px;
   }
   &:before {
      content: '';
      width: 100%;
      height: 2px;
      top: 20px;
      z-index: -1;
      position: absolute;
      background: #f5e7e7;
   }
`

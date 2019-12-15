import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

// Context
import { Context, initialState, reducers } from './context'

// Components
import { Todo, AddTodo, EditTodo } from './components'

// Queries
import { GET_TODOS } from './queries'

const App = () => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
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
      <Context.Provider value={{ state, dispatch }}>
         <Wrapper>
            {state.isEditing ? <EditTodo /> : <AddTodo />}
            <h3 title="IN PROGRESS">
               <span />
               IN PROGRESS
            </h3>
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
            <h3 title="TODO">
               <span />
               TODO
            </h3>
            <ul>
               {state.todos.todo.length > 0 ? (
                  state.todos.todo.map(todo => (
                     <Todo key={todo.id} todo={todo} />
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
               {state.todos.done.length > 0 ? (
                  state.todos.done.map(todo => (
                     <Todo key={todo.id} todo={todo} />
                  ))
               ) : (
                  <Empty>
                     <span>Get them todos.</span>
                  </Empty>
               )}
            </ul>
         </Wrapper>
      </Context.Provider>
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

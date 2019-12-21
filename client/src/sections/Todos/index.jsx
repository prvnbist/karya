import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

// State
import { Context } from '../../context'

// Components
import { Todo, AddTodo, EditTodo } from '../../components'

// Queries
import { GET_TODOS } from '../../queries'

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
const Wrapper = styled.div`
   margin: 0 auto;
   width: 100%;
   padding: 0 16px;
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

const Heading = styled.h3`
   color: #fff;
   font-size: 14px;
   padding: 0 10px;
   height: 20px;
   line-height: 20px;
   margin-bottom: 8px;
   border-radius: 16px;
   display: inline-block;
   &:nth-of-type(1) {
      color: #7358f6;
      background: #d1e6ff;
   }
   &:nth-of-type(2) {
      color: #585454;
      background: #e8e7ec;
   }
   &:nth-of-type(3) {
      color: #2db52d;
      background: #9dfb9d;
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
`

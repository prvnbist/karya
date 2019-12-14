import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

// Queries
import { DELETE_TODO, GET_TODOS } from '../../queries'

// Styles
import { ListItem } from './styles'

// Assets
import { CloseIcon } from '../../assets/icons'

const Todo = ({ todo }) => {
   const client = useApolloClient()
   const [deleteTodo] = useMutation(DELETE_TODO, {
      onCompleted: ({ deleteTodo: { data } }) => {
         const { todos } = client.readQuery({ query: GET_TODOS })
         client.writeQuery({
            query: GET_TODOS,
            data: {
               todos: [...todos.filter(todo => todo.id !== data.id)],
            },
         })
      },
   })
   return (
      <ListItem>
         <span>{todo.title}</span>
         <button onClick={() => deleteTodo({ variables: { id: todo.id } })}>
            <CloseIcon color="#fff" />
         </button>
      </ListItem>
   )
}

export default Todo

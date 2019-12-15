import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

// Queries
import { DELETE_TODO, GET_TODOS } from '../../queries'

// Styles
import { ListItem } from './styles'

// Assets
import { CloseIcon, EditIcon } from '../../assets/icons'

const Todo = ({ todo, setEditMode }) => {
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
         <div>
            <span>
               {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
               }).format(todo.createdAt)}
            </span>
            <button onClick={() => setEditMode(todo)}>
               <EditIcon color="#fff" />
            </button>
            <button onClick={() => deleteTodo({ variables: { id: todo.id } })}>
               <CloseIcon color="#fff" />
            </button>
         </div>
      </ListItem>
   )
}

export default Todo

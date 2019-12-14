import React from 'react'
import { useMutation } from '@apollo/react-hooks'

// Queries
import { DELETE_TODO } from '../../queries'

// Styles
import { ListItem } from './styles'

// Assets
import { CloseIcon } from '../../assets/icons'

const Todo = ({ todo }) => {
   const [deleteTodo] = useMutation(DELETE_TODO)
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

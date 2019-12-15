import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

// Queries
import { ADD_TODO, GET_TODOS } from '../../queries'

// Styles
import { Form } from './styles'

// Assets
import { AddIcon } from '../../assets/icons'

const AddTodo = ({ dispatch }) => {
   const client = useApolloClient()
   const [title, setTitle] = React.useState('')

   const [addTodo] = useMutation(ADD_TODO, {
      onCompleted: ({ addTodo: { data: todo } }) => {
         dispatch({ type: 'CLEAR_TODOS' })
         const { todos } = client.readQuery({ query: GET_TODOS })
         client.writeQuery({
            query: GET_TODOS,
            data: { todos: [todo, ...todos] },
         })
      },
   })

   const submit = e => {
      e.preventDefault()
      if (title) {
         addTodo({
            variables: {
               title,
               tags: [],
            },
         })
      }
      setTitle('')
   }
   return (
      <Form onSubmit={submit}>
         <input
            type="text"
            value={title}
            placeholder="Enter a todo"
            onChange={e => setTitle(e.target.value)}
         />
         <button type="submit">
            <AddIcon color="#fff" />
            Add
         </button>
      </Form>
   )
}

export default AddTodo

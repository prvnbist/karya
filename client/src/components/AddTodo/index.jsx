import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

// Queries
import { ADD_TODO, GET_TODOS } from '../../queries'

// Styles
import { Form } from './styles'

// Assets
import { AddIcon } from '../../assets/icons'

const AddTodo = () => {
   const client = useApolloClient()
   const [addTodo] = useMutation(ADD_TODO, {
      onCompleted: ({ addTodo: { data: todo } }) => {
         const { todos } = client.readQuery({ query: GET_TODOS })
         client.writeQuery({
            query: GET_TODOS,
            data: { todos: [todo, ...todos] },
         })
      },
   })
   const [todo, setTodo] = React.useState('')

   const submit = e => {
      e.preventDefault()
      addTodo({
         variables: {
            title: todo,
            tags: [],
         },
      })
      setTodo('')
   }
   return (
      <Form onSubmit={submit}>
         <input
            type="text"
            value={todo}
            placeholder="Enter a todo"
            onChange={e => setTodo(e.target.value)}
         />
         <button type="submit">
            <AddIcon color="#fff" />
            Add
         </button>
      </Form>
   )
}

export default AddTodo

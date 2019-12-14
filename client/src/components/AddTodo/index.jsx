import React from 'react'
import { useMutation } from '@apollo/react-hooks'

// Queries
import { ADD_TODO } from '../../queries'

// Styles
import { Form } from './styles'

// Assets
import { AddIcon } from '../../assets/icons'

const AddTodo = () => {
   const [addTodo] = useMutation(ADD_TODO)
   const [todo, setTodo] = React.useState('')

   const submit = e => {
      e.preventDefault()
      addTodo({
         variables: {
            title: todo,
            tags: [],
         },
      })
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

import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

// Context
import { Context } from '../../context'

// Queries
import { UPDATE_TODO, GET_TODOS } from '../../queries'

// Styles
import { Form } from './styles'

// Assets
import { AddIcon } from '../../assets/icons'

const EditTodo = () => {
   const { state, dispatch } = React.useContext(Context)
   const client = useApolloClient()

   const [updateTodo] = useMutation(UPDATE_TODO, {
      onCompleted: ({ updateTodo: { data: todo } }) => {
         dispatch({ type: 'CLEAR_TODOS' })
         const { todos } = client.readQuery({ query: GET_TODOS })
         const index = todos.findIndex(t => t.id === todo.id)
         todos[index] = todo
         client.writeQuery({
            query: GET_TODOS,
            data: { todos: [...todos] },
         })
      },
   })
   const [title, setTitle] = React.useState('')
   const [status, setStatus] = React.useState('TODO')

   React.useEffect(() => {
      if (state.editingTodo?.title) {
         setStatus(state.editingTodo.status)
         setTitle(state.editingTodo.title)
      }
   }, [state.editingTodo])

   const submit = e => {
      e.preventDefault()
      updateTodo({
         variables: {
            id: state.editingTodo.id,
            ...(title !== state.editingTodo.title && { title }),
            ...(status !== state.editingTodo.status && { status }),
         },
      })
      dispatch({ type: 'EXIT_EDITING' })
   }
   return (
      <Form onSubmit={submit}>
         <input
            type="text"
            value={title}
            placeholder="Enter a todo"
            onChange={e => setTitle(e.target.value)}
         />
         <select
            name="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
         >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
         </select>
         <button type="submit">
            <AddIcon color="#fff" />
            Save
         </button>
      </Form>
   )
}

export default EditTodo

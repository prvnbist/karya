import React from 'react'

const Context = React.createContext()

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_FORM':
         return { ...state, form: { ...state.form, ...payload } }
      case 'CLEAR_FORM':
         return {
            ...state,
            form: { status: 'PENDING', title: '', description: '', date: '' },
         }
      case 'SET_FORM_OPEN':
         return { ...state, is_form_open: payload }
      default:
         return state
   }
}

const StateProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducers, {
      is_form_open: false,
      form: { status: 'PENDING', title: '', description: '', date: '' },
   })

   const toggle_form_modal = () => {
      dispatch({ type: 'SET_FORM_OPEN', payload: !state.is_form_open })
   }

   const set_form = form => {
      dispatch({ type: 'SET_FORM', payload: form })
   }

   const clear_form = () => {
      dispatch({ type: 'CLEAR_FORM' })
   }

   return (
      <Context.Provider
         value={{ clear_form, set_form, toggle_form_modal, ...state }}
      >
         {children}
      </Context.Provider>
   )
}

export const useGlobal = () => React.useContext(Context)

export default StateProvider

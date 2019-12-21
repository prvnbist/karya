import React from 'react'
import styled from 'styled-components'

// Context
import { Context, initialState, reducers } from './context'

// Sections
import { Todos, Sidebar } from './sections'

const App = () => {
   const [state, dispatch] = React.useReducer(reducers, initialState)

   return (
      <Context.Provider value={{ state, dispatch }}>
         <Wrapper>
            <Sidebar />
            <Todos />
         </Wrapper>
      </Context.Provider>
   )
}

export default App

const Wrapper = styled.div`
   display: grid;
   margin: 0 auto;
   max-width: 980px;
   width: calc(100vw - 48px);
   grid-template-columns: 256px 1fr;
`

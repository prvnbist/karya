import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import {
   InMemoryCache,
   IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { createGlobalStyle } from 'styled-components'

import App from './App'

const fragmentMatcher = new IntrospectionFragmentMatcher({
   introspectionQueryResultData: {
      __schema: {
         types: [],
      },
   },
})

const link = new HttpLink({
   uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
   link,
   cache: new InMemoryCache({ fragmentMatcher }),
})

const GlobalStyle = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:200,300,400,500,600&display=swap');
   * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'IBM Plex Sans', sans-serif;
   }
   body {
      font-family: 'IBM Plex Sans', sans-serif;
   }
`

ReactDOM.render(
   <ApolloProvider client={client}>
      <GlobalStyle />
      <App />
   </ApolloProvider>,
   document.getElementById('root')
)

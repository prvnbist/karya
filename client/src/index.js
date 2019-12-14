import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './App'

const link = new HttpLink({
   uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
   link,
   cache: new InMemoryCache(),
})

ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
   document.getElementById('root')
)

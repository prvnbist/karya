import React from 'react'
import ReactDOM from 'react-dom'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import {
   InMemoryCache,
   IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'

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

ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
   document.getElementById('root')
)

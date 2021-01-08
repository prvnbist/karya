import {
   split,
   ApolloClient,
   ApolloLink,
   InMemoryCache,
   createHttpLink,
   ApolloProvider,
} from '@apollo/client'
import tw, { GlobalStyles } from 'twin.macro'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import '../styles/global.css'

const wssLink = process.browser
   ? new WebSocketLink({
        uri: process.env.HASURA_WSS_URL,
        options: {
           reconnect: true,
           connectionParams: {
              headers: {
                 'x-hasura-admin-secret': `${process.env.HASURA_ADMIN_SECRET}`,
              },
           },
        },
     })
   : null

const authLink = new ApolloLink((operation, forward) => {
   operation.setContext(({ headers }) => ({
      headers: {
         ...headers,
         'x-hasura-admin-secret': `${process.env.HASURA_ADMIN_SECRET}`,
      },
   }))
   return forward(operation)
})

const httpLink = createHttpLink({
   uri: `${process.env.HASURA_HTTPS_URL}`,
})

const splitLink = process.browser
   ? split(
        ({ query }) => {
           const definition = getMainDefinition(query)
           return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
           )
        },
        wssLink,
        authLink.concat(httpLink)
     )
   : authLink.concat(httpLink)

const client = new ApolloClient({
   link: splitLink,
   cache: new InMemoryCache(),
})

const App = ({ Component, pageProps }) => (
   <ApolloProvider client={client}>
      <GlobalStyles />
      <div css={tw`px-4 bg-gray-100 h-screen w-screen overflow-hidden`}>
         <Component {...pageProps} />
      </div>
   </ApolloProvider>
)

export default App

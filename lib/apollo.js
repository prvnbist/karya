import {
   split,
   ApolloClient,
   ApolloLink,
   InMemoryCache,
   createHttpLink,
   ApolloProvider,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const wssLink = process.browser
   ? new WebSocketLink({
        uri: process.env.HASURA_WSS_URL,
        options: {
           reconnect: true,
           connectionParams: {
              headers: {
                 ...(process.env.HASURA_ADMIN_SECRET && {
                    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
                 }),
              },
           },
        },
     })
   : null

const authLink = new ApolloLink((operation, forward) => {
   operation.setContext(({ headers }) => ({
      headers: {
         ...headers,
         ...(process.env.HASURA_ADMIN_SECRET && {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
         }),
      },
   }))
   return forward(operation)
})

const httpLink = createHttpLink({
   uri: process.env.HASURA_HTTPS_URL,
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

const Apollo = ({ children }) => {
   return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Apollo

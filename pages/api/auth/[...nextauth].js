import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.HASURA_HTTPS_URL, {
   headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
   },
})

export default NextAuth({
   providers: [
      Providers.Google({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   pages: {
      signIn: '/',
   },
   database: {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: {
         rejectUnauthorized: false,
      },
   },
   callbacks: {
      async session(session, token) {
         try {
            session.user.id = token.id

            const { user = {} } = await client.request(USER, { id: token.id })

            if (!user.username) {
               const username = user.email.match(/[^@]*/i)[0]
               await client.request(UPDATE_USER, {
                  id: user.id,
                  _set: { username },
               })
            }

            if (user.id) {
               session.user = {
                  ...session.user,
                  ...user,
               }
            }

            return session
         } catch (error) {
            console.log(error)
            return {}
         }
      },
   },
})

const USER = `
   query user($id: String!) {
      user: users_by_pk(id: $id) {
         id
         name
         email
         username
      }
   }
`

const UPDATE_USER = `
   mutation update_user($id: String!, $_set: users_set_input = {}) {
      update_user: update_users_by_pk(pk_columns: { id: $id }, _set: $_set) {
         id
      }
   }
`

import React from 'react'
import tw from 'twin.macro'

import { Loader } from '../components'

const Auth = ({ children }) => {
   const [session, setSession] = React.useState({
      loading: true,
      error: '',
      secret: '',
      authenticated: false,
      storeLocally: false,
   })

   React.useEffect(() => {
      if (!process.env.HASURA_ADMIN_SECRET) {
         setSession(session => ({
            ...session,
            loading: false,
         }))
      } else {
         let exists = localStorage.key('secret')
         if (exists) {
            const secret = localStorage.getItem('secret')
            if (secret === process.env.HASURA_ADMIN_SECRET) {
               setSession(session => ({
                  ...session,
                  loading: false,
                  authenticated: true,
               }))
            } else {
               setSession(session => ({
                  ...session,
                  loading: false,
               }))
            }
         } else {
            setSession(session => ({
               ...session,
               loading: false,
            }))
         }
      }
   }, [])

   if (session.loading)
      return (
         <div css={tw`h-screen w-screen`}>
            <Loader />
         </div>
      )
   if (!session.authenticated)
      return (
         <div css={tw`px-4 h-screen w-screen overflow-y-auto`}>
            <AuthForm session={session} setSession={setSession} />
         </div>
      )
   return <>{children}</>
}

export default Auth

const AuthForm = ({ session, setSession }) => {
   const verify_session = () => {
      if (session.secret === process.env.HASURA_ADMIN_SECRET) {
         setSession(session => ({
            ...session,
            secret: '',
            authenticated: true,
         }))
         if (session.storeLocally) {
            localStorage.setItem('secret', session.secret)
         }
      } else {
         setSession(session => ({
            ...session,
            error: 'Incorrect code, please try again!',
         }))
      }
   }

   return (
      <div css={tw`h-screen flex items-center justify-center`}>
         <section css={tw`flex flex-col bg-white border p-4 rounded`}>
            <h2 css={tw`text-center text-gray-700 text-xl font-medium mb-3`}>
               Authentication
            </h2>
            <input
               type="password"
               value={session.secret}
               placeholder="Enter the secret code"
               css={tw`h-10 rounded px-3 bg-gray-100`}
               onChange={e =>
                  setSession(session => ({
                     ...session,
                     error: '',
                     secret: e.target.value,
                  }))
               }
            />
            {session.error && (
               <span css={tw`text-red-600`}>{session.error}</span>
            )}
            <button
               onClick={verify_session}
               disabled={session.secret.length === 0}
               css={[
                  tw`mt-3 px-3 h-10 rounded text-white uppercase tracking-wider`,
                  session.secret.length > 0
                     ? tw`bg-green-600`
                     : tw`bg-gray-300 text-gray-600 cursor-not-allowed`,
               ]}
            >
               Submit
            </button>
            <fieldset css={tw`mt-3`}>
               <input
                  css={tw`mr-2`}
                  type="checkbox"
                  id="store_locally"
                  name="store_locally"
                  checked={session.storeLocally}
                  onChange={() =>
                     setSession(session => ({
                        ...session,
                        storeLocally: !session.storeLocally,
                     }))
                  }
               />
               <label htmlFor="store_locally">Remember Me</label>
            </fieldset>
         </section>
      </div>
   )
}

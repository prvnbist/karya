import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/client'

import { Loader } from '../components'

const Login = ({ providers }) => {
   const router = useRouter()
   const [session, loading] = useSession()

   useEffect(() => {
      if (!loading && session?.user?.email) {
         router.push('/')
      }
   }, [router, loading, session])

   return (
      <>
         <main tw="h-screen bg-gray-100 pt-12 flex justify-center">
            {loading ? (
               <Loader />
            ) : (
               <div tw="self-start bg-white rounded p-12 border border-gray-200">
                  <h2 tw="text-gray-700 text-xl mb-3">
                     {session ? 'You are already logged in!' : 'Login'}
                  </h2>
                  {!session && (
                     <>
                        {providers?.google?.id && (
                           <button
                              tw="px-4 w-full rounded h-10 bg-indigo-600 text-white"
                              onClick={() => signIn('google')}
                           >
                              Sign In with Google
                           </button>
                        )}
                     </>
                  )}
               </div>
            )}
         </main>
      </>
   )
}

export default Login

export const getServerSideProps = async () => {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}

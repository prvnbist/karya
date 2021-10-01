import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/client'

import { Loader } from '../components'

const Login = ({ providers }) => {
   const router = useRouter()
   const [session, loading] = useSession()
   const [isAuthenticating, setIsAuthenticating] = useState(false)

   useEffect(() => {
      if (session?.user?.email) {
         router.push('/dashboard')
      }
   }, [router, session])

   const viaGoogle = () => {
      try {
         setIsAuthenticating(true)
         signIn('google', {
            callbackUrl: `${window.location.origin}/dashboard`,
         })
      } catch (error) {
         console.log(error)
         setIsAuthenticating(false)
      }
   }

   return (
      <main tw="h-screen bg-dark-300 pt-12 flex justify-center">
         {loading ? (
            <Loader />
         ) : (
            <div tw="self-start bg-dark-200 rounded p-12 shadow-lg mx-3 w-full lg:w-[320px]">
               <h2 tw="text-white text-xl mb-3">Login to Karya</h2>
               {providers?.google?.id && (
                  <button
                     onClick={viaGoogle}
                     disabled={isAuthenticating}
                     tw="px-4 w-full rounded h-10 bg-indigo-600 text-white disabled:(bg-dark-100 text-dark-300)"
                  >
                     {isAuthenticating
                        ? 'Logging In...'
                        : 'Sign In with Google'}
                  </button>
               )}
            </div>
         )}
      </main>
   )
}

export default Login

export const getServerSideProps = async () => {
   const providers = await getProviders()
   return {
      props: { providers },
   }
}

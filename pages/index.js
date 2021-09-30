import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'
import { signOut, useSession } from 'next-auth/client'
import { add, sub, format, startOfWeek, endOfWeek } from 'date-fns'

import { QUERIES } from '../graphql'
import { useGlobal } from '../store/global'
import { Loader, Dates, Form } from '../components'

export default function Home() {
   const router = useRouter()
   const { is_form_open } = useGlobal()
   const [session, sessionLoading] = useSession()
   const [selectedDate, setSelectedDate] = React.useState(() =>
      format(new Date(), 'yyyy-MM-dd')
   )
   const { loading, data: { dates = [] } = {} } = useSubscription(
      QUERIES.DATES,
      {
         skip: !selectedDate || sessionLoading || !session?.user?.id,
         variables: {
            user_id: session?.user?.id,
            where: {
               date: {
                  _gte: startOfWeek(new Date(selectedDate), {
                     weekStartsOn: 2,
                  }),
                  _lt: endOfWeek(new Date(selectedDate), { weekStartsOn: 2 }),
               },
            },
         },
      }
   )

   React.useEffect(() => {
      if (!sessionLoading && !session?.user?.email) {
         router.push('/login')
      }
   }, [router, sessionLoading, session])

   if (loading || sessionLoading) return <Loader />
   return (
      <div>
         <Head>
            <title>Karya</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main tw="p-4 h-screen flex flex-col pb-3">
            <header
               css={tw`flex-shrink-0 h-16 mb-8 flex items-center justify-between`}
            >
               <section tw="flex items-center">
                  <section tw="flex items-center gap-2 mr-3">
                     <button
                        onClick={() =>
                           setSelectedDate(
                              format(
                                 sub(new Date(selectedDate), { days: 7 }),
                                 'yyyy-MM-dd'
                              )
                           )
                        }
                        tw="rounded h-8 w-8 border border-gray-200 flex items-center justify-center hover:bg-gray-200"
                     >
                        <LeftArrow tw="stroke-current text-gray-700" />
                     </button>
                     <button
                        onClick={() =>
                           setSelectedDate(
                              format(
                                 add(new Date(selectedDate), { days: 7 }),
                                 'yyyy-MM-dd'
                              )
                           )
                        }
                        tw="rounded h-8 w-8 border border-gray-200 flex items-center justify-center hover:bg-gray-200"
                     >
                        <RightArrow tw="stroke-current text-gray-700" />
                     </button>
                  </section>
                  <h2 tw="text-2xl font-bold">
                     {format(new Date(selectedDate), 'MMM yyyy')}
                  </h2>
               </section>
               {session && (
                  <aside tw="flex items-center">
                     <span
                        title={session.user?.name || ''}
                        tw="overflow-hidden flex items-center justify-center h-10 w-10 bg-green-300 text-black rounded-full"
                     >
                        {session.user?.image ? (
                           <Image
                              width="100%"
                              height="100%"
                              src={session.user?.image}
                              alt={session.user?.name || ''}
                           />
                        ) : (
                           get_initials(session.user?.name || '')
                        )}
                     </span>
                     <button
                        tw="ml-4 font-medium text-red-500"
                        onClick={() => signOut({ redirect: false })}
                     >
                        Logout
                     </button>
                  </aside>
               )}
            </header>
            <Dates dates={dates} />
         </main>
         {is_form_open && <Form />}
      </div>
   )
}

const LeftArrow = ({ size = 20, ...props }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         {...props}
      >
         <path d="M15 18l-6-6 6-6" />
      </svg>
   )
}

const RightArrow = ({ size = 20, ...props }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width={size}
         height={size}
         viewBox="0 0 24 24"
         fill="none"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
         {...props}
      >
         <path d="M9 18l6-6-6-6" />
      </svg>
   )
}

const get_initials = name =>
   name
      .replace(/[^a-zA-Z- ]/g, '')
      .match(/\b\w/g)
      ?.join('') || ''

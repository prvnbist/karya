import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import Icon from '../../icons'
import { useDate } from '../../hooks'
import { QUERIES } from '../../graphql'
import { Loader, Task } from '../../components'

export default function Dates() {
   const router = useRouter()
   const { current, week, setCurrent } = useDate()
   const { loading, data: { tasks = {} } = {} } = useSubscription(
      QUERIES.TASKS,
      {
         variables: {
            where: { published_at: { _eq: current } },
         },
      }
   )
   return (
      <div>
         <Head>
            <title>Dates View | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <header
               css={tw`flex items-center border-b border-gray-300 py-2 mb-3 space-x-2`}
            >
               <span
                  onClick={() => router.back()}
                  css={tw`inline-flex items-center justify-center h-10 w-10 cursor-pointer`}
               >
                  <Icon.Back size="24" css={tw`stroke-current`} />
               </span>
               <h1 css={tw`text-2xl text-gray-800`}>Dates View</h1>
            </header>
            <section>
               <ul
                  css={tw`grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 items-center gap-3`}
               >
                  {Array.isArray(week.days()) &&
                     week.days().map(date => (
                        <li
                           key={date}
                           onClick={() => setCurrent(date.value)}
                           css={[
                              tw`cursor-pointer py-3 text-gray-500 border border-gray-300 rounded flex items-center justify-center`,
                              date.value === current &&
                                 tw`bg-white border-none shadow-lg text-gray-800`,
                           ]}
                        >
                           {date.display}
                        </li>
                     ))}
               </ul>
            </section>
            <section>
               <h2
                  css={tw`mt-3 text-xl text-gray-800 py-1 border-b border-gray-300 mb-3`}
               >
                  Tasks({tasks?.aggregate?.count || 0})
               </h2>
               {loading ? (
                  <div css={tw`h-12`}>
                     <Loader />
                  </div>
               ) : (
                  <>
                     {tasks?.aggregate?.count === 0 ? (
                        <span>No tasks available.</span>
                     ) : (
                        <ul css={tw`space-y-2`}>
                           {tasks?.nodes?.map(task => (
                              <Task key={task.id} task={task} />
                           ))}
                        </ul>
                     )}
                  </>
               )}
            </section>
         </main>
      </div>
   )
}

import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import { useSubscription } from '@apollo/client'
import { format, startOfWeek, endOfWeek } from 'date-fns'

import * as Icon from '../icons'
import { QUERIES } from '../graphql'
import { Loader, Task } from '../components'

export default function Dates() {
   const [today] = React.useState(() => format(new Date(), 'yyyy-MM-dd'))
   const { loading, data: { dates = [] } = {} } = useSubscription(
      QUERIES.DATES,
      {
         skip: !today,
         variables: {
            where: {
               date: {
                  _gte: startOfWeek(new Date(today), { weekStartsOn: 2 }),
                  _lt: endOfWeek(new Date(today), { weekStartsOn: 2 }),
               },
            },
         },
      }
   )

   if (loading) return <Loader />
   return (
      <div>
         <Head>
            <title>Karya</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main tw="h-screen flex flex-col pb-3">
            <header css={tw`flex-shrink-0 h-16 mb-8 flex items-center`}>
               <h2 tw="text-3xl font-bold">{format(new Date(), 'MMM yyyy')}</h2>
            </header>
            <ul tw="flex-1 h-full grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-4">
               {dates.map((node, index) => (
                  <li
                     key={node.day}
                     css={[
                        [5, 6].includes(index)
                           ? tw`lg:col-start-6`
                           : tw`lg:row-start-1 lg:row-end-3`,
                     ]}
                  >
                     <header tw="border-b border-gray-300 flex items-center justify-between">
                        <span tw="text-lg font-medium">{node.title}</span>
                        <span tw="text-lg font-medium text-gray-400">
                           {node.day}
                        </span>
                     </header>
                     <main>
                        <ul tw="pt-2">
                           {node.tasks.nodes.map(task => (
                              <Task task={task} key={task.id} />
                           ))}
                           <li tw="cursor-pointer h-10 bg-white border-b border-gray-300 flex items-center text-gray-500 hover:bg-gray-100">
                              <span tw="flex h-10 w-10 items-center justify-center">
                                 <Icon.Add
                                    size="18"
                                    css={tw`stroke-current text-gray-500`}
                                 />
                              </span>
                              Add task
                           </li>
                        </ul>
                     </main>
                  </li>
               ))}
            </ul>
         </main>
      </div>
   )
}

import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import { useSubscription } from '@apollo/client'
import { format, startOfWeek, endOfWeek } from 'date-fns'

import { QUERIES } from '../graphql'
import { useGlobal } from '../store/global'
import { Loader, Dates, Form } from '../components'

export default function Home() {
   const { is_form_open } = useGlobal()
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
            <Dates dates={dates} />
         </main>
         {is_form_open && <Form />}
      </div>
   )
}

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import tw from 'twin.macro'
import { useSubscription } from '@apollo/client'

import { QUERIES } from '../graphql'

export default function Home() {
   const { data: { projects = {} } = {} } = useSubscription(
      QUERIES.PROJECT_AGGREGATE
   )
   return (
      <div>
         <Head>
            <title>Home | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <h1
               css={tw`text-2xl text-gray-800 py-2 border-b border-gray-300 mb-3`}
            >
               Home
            </h1>
            <ul css={tw`grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
               <li>
                  <Link href="/projects">
                     <a
                        css={tw`block cursor-pointer transition-all transition-shadow duration-500 ease-in-out bg-white border border-gray-200 py-4 px-5 rounded hover:shadow-xl`}
                     >
                        Projects ({projects?.aggregate?.count || 0})
                     </a>
                  </Link>
               </li>
            </ul>
         </main>
      </div>
   )
}

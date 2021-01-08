import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'

export default function Home() {
   return (
      <div>
         <Head>
            <title>Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main tw="bg-indigo-600 italic text-4xl text-white h-screen w-screen flex items-center justify-center">
            Hello, World!
         </main>
      </div>
   )
}

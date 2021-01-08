import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import tw from 'twin.macro'
import { useSubscription } from '@apollo/client'

import { QUERIES } from '../graphql'

export default function Home() {
   const { loading, data: { projects = [] } = {} } = useSubscription(
      QUERIES.PROJECTS
   )
   return (
      <div>
         <Head>
            <title>Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <h1
               css={tw`text-2xl text-gray-800 py-2 border-b border-gray-300 mb-3`}
            >
               Projects
            </h1>
            {loading ? (
               <div>loading...</div>
            ) : (
               <>
                  {projects.length === 0 ? (
                     <span>No projects available.</span>
                  ) : (
                     <ul css={tw`space-y-2`}>
                        {projects.map(project => (
                           <li
                              key={project.id}
                              css={tw`transition-all transition-shadow duration-500 ease-in-out bg-white border border-gray-200 py-4 px-5 rounded hover:shadow-xl`}
                           >
                              <Link href={`/projects/${project.id}`}>
                                 <a>
                                    <h2 css={tw`text-xl mb-1`}>
                                       {project.title}
                                    </h2>
                                    <p css={tw`text-gray-600`}>
                                       {project.description}
                                    </p>
                                 </a>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  )}
               </>
            )}
         </main>
      </div>
   )
}

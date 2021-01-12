import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import Icon from '../../icons'
import { QUERIES } from '../../graphql'
import { Loader } from '../../components'

export default function Projects() {
   const router = useRouter()
   const { loading, data: { projects = [] } = {} } = useSubscription(
      QUERIES.PROJECTS
   )
   return (
      <div>
         <Head>
            <title>Projects | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <header
               css={tw`sticky top-0 bg-gray-100 flex items-center border-b border-gray-300 py-2 mb-3 space-x-2`}
            >
               <span
                  onClick={() => router.push('/')}
                  css={tw`inline-flex items-center justify-center h-10 w-10 cursor-pointer`}
               >
                  <Icon.Home size="22" css={tw`stroke-current text-gray-700`} />
               </span>
               <h1 css={tw`text-2xl text-gray-800`}>Projects</h1>
            </header>
            {loading ? (
               <div css={tw`h-12`}>
                  <Loader />
               </div>
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

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
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
            <h1>Projects</h1>
            {loading ? (
               <div>loading...</div>
            ) : (
               <>
                  {projects.length === 0 ? (
                     <span>No projects available.</span>
                  ) : (
                     <ul>
                        {projects.map(project => (
                           <li key={project.id}>
                              <Link href={`/projects/${project.id}`}>
                                 <a>
                                    <h2>{project.title}</h2>
                                    <p>{project.description}</p>
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

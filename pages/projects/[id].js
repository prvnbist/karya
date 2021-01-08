import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import { QUERIES } from '../../graphql'

export default function Project() {
   const router = useRouter()
   const { id } = router.query
   const { loading, data: { tasks = [] } = {} } = useSubscription(
      QUERIES.TASKS,
      { variables: { where: { projects: { project: { id: { _eq: id } } } } } }
   )
   return (
      <div>
         <Head>
            <title>Project Details | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <h1>Tasks</h1>
            {loading ? (
               <div>loading...</div>
            ) : (
               <>
                  {tasks.length === 0 ? (
                     <span>No tasks available.</span>
                  ) : (
                     <ul>
                        {tasks.map(task => (
                           <li key={task.id}>
                              <h2>{task.title}</h2>
                              <p>{task.description}</p>
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

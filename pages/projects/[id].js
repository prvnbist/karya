import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import { QUERIES } from '../../graphql'

export default function Project() {
   const router = useRouter()
   const { id } = router.query
   const {
      loading: projectLoading,
      data: { project = {} } = {},
   } = useSubscription(QUERIES.PROJECT, { variables: { id } })
   const { loading: tasksLoading, data: { tasks = [] } = {} } = useSubscription(
      QUERIES.TASKS,
      {
         variables: { where: { projects: { project: { id: { _eq: id } } } } },
      }
   )
   if (projectLoading) return <div>loading...</div>
   return (
      <div>
         <Head>
            <title>{project?.title} - Project Details | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <h1 title={project?.title || ''}>{project?.title || ''}</h1>
            <p>{project?.description || ''}</p>
            {project?.created_at && (
               <span title={project?.created_at}>
                  {new Intl.DateTimeFormat('en-US', {
                     year: 'numeric',
                     month: 'short',
                     day: 'numeric',
                  }).format(new Date(project?.created_at))}
               </span>
            )}
            {tasksLoading ? (
               <div>loading...</div>
            ) : (
               <>
                  {tasks.length === 0 ? (
                     <span>No tasks available.</span>
                  ) : (
                     <ul>
                        {tasks.map(task => (
                           <li key={task.id}>
                              <h2 title={task.title}>{task.title}</h2>
                              <p>{task?.description}</p>
                              {task?.created_at && (
                                 <span>
                                    {new Intl.DateTimeFormat('en-US', {
                                       year: 'numeric',
                                       month: 'short',
                                       day: 'numeric',
                                    }).format(new Date(task?.created_at))}
                                 </span>
                              )}
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

import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import Icon from '../../icons'
import { QUERIES } from '../../graphql'
import { Loader, Task } from '../../components'

export default function Project() {
   const router = useRouter()
   const { id } = router.query
   const {
      loading: projectLoading,
      data: { project = {} } = {},
   } = useSubscription(QUERIES.PROJECT, { variables: { id } })
   const { loading: tasksLoading, data: { tasks = {} } = {} } = useSubscription(
      QUERIES.TASKS,
      {
         variables: {
            order_by: { created_at: 'desc' },
            where: { projects: { project: { id: { _eq: id } } } },
         },
      }
   )
   if (projectLoading) return <Loader />
   return (
      <div>
         <Head>
            <title>{project?.title} - Project Details | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <header css={tw`sticky top-0 bg-gray-100 pb-3`}>
               <nav
                  css={tw`flex items-center border-b border-gray-300 py-2 mb-3 space-x-2`}
               >
                  <span
                     onClick={() => router.back()}
                     css={tw`inline-flex items-center justify-center h-10 w-10 cursor-pointer`}
                  >
                     <Icon.Back size="24" css={tw`stroke-current`} />
                  </span>
                  <h1 css={tw`text-2xl text-gray-800`}>Project Details</h1>
               </nav>
               <section
                  css={tw`bg-white border border-gray-200 py-4 px-5 rounded`}
               >
                  <section css={tw`mb-1 flex items-center justify-between`}>
                     <h2 title={project?.title || ''} css={tw`text-xl`}>
                        {project?.title || ''}
                     </h2>
                     {project?.created_at && (
                        <span
                           title={project?.created_at}
                           css={tw`uppercase tracking-wider font-medium text-sm text-gray-600`}
                        >
                           {new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                           }).format(new Date(project?.created_at))}
                        </span>
                     )}
                  </section>
                  <p css={tw`text-gray-600`}>{project?.description || ''}</p>
               </section>
            </header>
            <h2
               css={tw`mt-2 pb-2 text-xl text-gray-800 py-1 border-b border-gray-300 mb-3`}
            >
               Tasks
            </h2>
            {tasksLoading ? (
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
         </main>
      </div>
   )
}

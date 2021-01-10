import React from 'react'
import Head from 'next/head'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import Icon from '../../icons'
import { QUERIES } from '../../graphql'
import { Loader, Task } from '../../components'

export default function Tag() {
   const router = useRouter()
   const { id } = router.query
   const [tasks, setTasks] = React.useState([])
   const {
      loading: loading,
      data: { tag = {} } = {},
   } = useSubscription(QUERIES.TAG, { variables: { id } })

   React.useEffect(() => {
      if (tag?.tasks?.aggregate?.count > 0) {
         const { nodes } = tag?.tasks
         setTasks(nodes.map(node => node.task))
      }
   }, [tag])

   if (loading) return <Loader />
   return (
      <div>
         <Head>
            <title>{tag?.title} - Tag Details | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <header
               css={tw`flex items-center border-b border-gray-300 py-2 mb-3 space-x-2`}
            >
               <span
                  onClick={() => router.back()}
                  css={tw`inline-flex items-center justify-center h-10 w-10 cursor-pointer`}
               >
                  <Icon.Back size="24" css={tw`stroke-current`} />
               </span>
               <h1 css={tw`text-2xl text-gray-800`}>
                  {tag?.title ? `${tag?.title} -` : ''} Tag Details
               </h1>
            </header>
            <h2
               css={tw`mt-3 text-xl text-gray-800 py-1 border-b border-gray-300 mb-3`}
            >
               Tasks({tag?.tasks?.aggregate?.count || 0})
            </h2>
            {tasks.length === 0 ? (
               <span>No tasks available.</span>
            ) : (
               <ul css={tw`space-y-2`}>
                  {tasks.map(task => (
                     <Task key={task.id} task={task} />
                  ))}
               </ul>
            )}
         </main>
      </div>
   )
}

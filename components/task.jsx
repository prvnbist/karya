import React from 'react'
import tw from 'twin.macro'
import { useMutation } from '@apollo/client'

import * as Icon from '../icons'
import { useGlobal } from '../store/global'
import { MUTATIONS } from '../graphql/mutations'

const Task = ({ task }) => {
   const { toggle_form_modal, set_form } = useGlobal()

   const [upsertTask] = useMutation(MUTATIONS.TASK.UPSERT, {
      onCompleted: () => {},
      onError: error => {
         console.error(error)
      },
   })

   const openTask = () => {
      toggle_form_modal()
      const { __typename, ...rest } = task
      set_form(rest)
   }

   const markComplete = e => {
      e.stopPropagation()
      const { __typename, ...rest } = task
      upsertTask({
         variables: { object: { ...rest, status: 'COMPLETED' } },
      })
   }

   return (
      <li
         className="group"
         onClick={openTask}
         css={tw`bg-white border-b border-gray-300 p-2 cursor-pointer hover:bg-gray-100`}
      >
         <section css={[tw`flex items-center justify-between space-x-2`]}>
            <main tw="flex items-center">
               <span title={task.status}>{STATUS[task.status]}</span>
               <h2
                  title={task.title}
                  css={[
                     tw`ml-2 text-sm truncate`,
                     task.status === 'CLOSED' && tw`text-gray-500 line-through`,
                  ]}
               >
                  {task.title}
               </h2>
            </main>
            {!['COMPLETED', 'CLOSED'].includes(task.status) && (
               <button
                  onClick={markComplete}
                  tw="hidden h-5 w-5 items-center justify-center group-hover:flex"
               >
                  <Icon.Done size={16} tw="stroke-current text-gray-500" />
               </button>
            )}
         </section>
      </li>
   )
}

export default Task

const statusWrapper = tw`flex h-3 w-3 rounded-full`
const STATUS = {
   PENDING: <span css={[statusWrapper, tw`bg-blue-300`]} />,
   IN_PROGRESS: <span css={[statusWrapper, tw`bg-yellow-300`]} />,
   COMPLETED: <span css={[statusWrapper, tw`bg-green-300`]} />,
   CLOSED: <span css={[statusWrapper, tw`bg-gray-300`]} />,
}

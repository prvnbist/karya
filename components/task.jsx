import React from 'react'
import tw from 'twin.macro'

import { useGlobal } from '../store/global'

const Task = ({ task }) => {
   const { toggle_form_modal, set_form } = useGlobal()

   const openTask = () => {
      toggle_form_modal()
      const { __typename, ...rest } = task
      set_form(rest)
   }
   return (
      <li
         onClick={openTask}
         css={tw`bg-white border-b border-gray-300 p-2 cursor-pointer hover:bg-gray-100`}
      >
         <section css={tw`flex items-center space-x-2`}>
            <span title={task.status}>{STATUS[task.status]}</span>
            <h2 title={task.title} tw="text-sm truncate">
               {task.title}
            </h2>
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
}

import React from 'react'
import tw from 'twin.macro'

export const Task = ({ task }) => {
   return (
      <li css={tw`bg-white border-b border-gray-300 p-2`}>
         <section css={tw`flex items-center space-x-2`}>
            <span title={task?.status}>{STATUS[task?.status]}</span>
            <h2 title={task.title}>{task.title}</h2>
         </section>
      </li>
   )
}

const statusWrapper = tw`flex h-3 w-3 rounded-full`
const STATUS = {
   PENDING: <span css={[statusWrapper, tw`bg-blue-300`]} />,
   IN_PROGRESS: <span css={[statusWrapper, tw`bg-yellow-300`]} />,
   COMPLETED: <span css={[statusWrapper, tw`bg-green-300`]} />,
}

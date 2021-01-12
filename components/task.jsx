import React from 'react'
import tw from 'twin.macro'

import { Tag } from './tag'
import Icon from '../icons'

export const Task = ({ task }) => {
   const tags = task.tags.map(({ tag }) => tag)
   return (
      <li css={tw`bg-white border border-gray-200 py-4 px-5 rounded`}>
         {Status[task?.status]}
         <section css={tw`mb-1 flex items-center justify-between`}>
            <h2 title={task.title} css={tw`text-xl mt-2 mb-1`}>
               {task.title}
            </h2>
            {task?.created_at && (
               <span
                  title={task?.created_at}
                  css={tw`uppercase tracking-wider font-medium text-sm text-gray-600`}
               >
                  {new Intl.DateTimeFormat('en-US', {
                     year: 'numeric',
                     month: 'short',
                     day: 'numeric',
                  }).format(new Date(task?.created_at))}
               </span>
            )}
         </section>
         <p css={tw`text-gray-600 mb-3`}>{task?.description}</p>
         <section css={tw`flex items-center`}>
            <span
               css={tw`inline-flex items-center justify-center h-6 w-6 mr-2`}
            >
               <Icon.Tag css={tw`stroke-current text-gray-400`} />
            </span>
            <ul css={tw`flex items-center space-x-2`}>
               {tags.length === 0 ? (
                  <span>No tags</span>
               ) : (
                  <>
                     {tags.map(tag => (
                        <Tag key={tag.id} tag={tag} />
                     ))}
                  </>
               )}
            </ul>
         </section>
      </li>
   )
}

const statusWrapper = tw`px-2 px-1 rounded uppercase tracking-wider text-sm font-medium`
const Status = {
   PENDING: (
      <span
         css={[
            statusWrapper,
            tw`bg-blue-100 border border-blue-200 text-blue-500`,
         ]}
      >
         Pending
      </span>
   ),
   IN_PROGRESS: (
      <span
         css={[
            statusWrapper,
            tw`bg-yellow-100 border border-yellow-200 text-yellow-700`,
         ]}
      >
         In Progress
      </span>
   ),
   COMPLETED: (
      <span
         css={[
            statusWrapper,
            tw`bg-green-200 border border-green-300 text-green-700`,
         ]}
      >
         Completed
      </span>
   ),
}

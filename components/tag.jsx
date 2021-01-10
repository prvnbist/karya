import React from 'react'
import tw from 'twin.macro'
import Link from 'next/link'

export const Tag = ({ tag }) => {
   return (
      <li
         css={tw`px-2 px-1 rounded bg-gray-200 border border-gray-300 text-gray-600 uppercase tracking-wider text-sm font-medium`}
      >
         <Link href={`/tags/${tag.id}`}>
            <a>
               {tag.title}
               {tag?.tasks?.aggregate?.count
                  ? `(${tag?.tasks?.aggregate?.count})`
                  : ''}
            </a>
         </Link>
      </li>
   )
}

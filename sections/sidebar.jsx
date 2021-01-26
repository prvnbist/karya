import React from 'react'
import { useRouter } from 'next/router'
import tw, { styled } from 'twin.macro'
import { useSubscription } from '@apollo/client'

import { QUERIES } from '../graphql'
import { Accordian, Tag } from '../components'

export const Sidebar = () => {
   const router = useRouter()
   const { id } = router.query
   const { data: { tags = {} } = {} } = useSubscription(QUERIES.TAGS)
   const { data: { projects = [] } = {} } = useSubscription(QUERIES.PROJECTS)
   return (
      <Styles.Aside>
         <h2
            css={tw`py-2 text-center text-xl font-medium text-indigo-600 uppercase tracking-widest`}
         >
            Karya App
         </h2>
         <Accordian>
            <Accordian.Head>Projects</Accordian.Head>
            <Accordian.Content>
               <ul>
                  {projects.map(project => (
                     <Styles.ListItem
                        key={project.id}
                        className={project.id === id ? 'active' : ''}
                        onClick={() => router.push(`/projects/${project.id}`)}
                     >
                        {project.title}
                     </Styles.ListItem>
                  ))}
               </ul>
            </Accordian.Content>
         </Accordian>
         <Accordian>
            <Accordian.Head>Tags</Accordian.Head>
            <Accordian.Content>
               {tags?.aggregate?.count > 0 && (
                  <ul css={tw`flex flex-wrap gap-1`}>
                     {tags.nodes.map(tag => (
                        <Tag key={tag.id} tag={tag} />
                     ))}
                  </ul>
               )}
            </Accordian.Content>
         </Accordian>
      </Styles.Aside>
   )
}

const Styles = {
   Aside: styled.aside`
      ${tw`pl-3`}
   `,
   ListItem: styled.li`
      ${tw`rounded cursor-pointer px-3 h-10 flex items-center hover:bg-gray-100`}
      &.active {
         ${tw`bg-green-200 text-green-800`}
      }
   `,
}

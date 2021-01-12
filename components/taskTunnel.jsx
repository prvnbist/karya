import React from 'react'
import { format } from 'date-fns'
import tw, { styled } from 'twin.macro'
import { useMutation, useSubscription } from '@apollo/client'

import { QUERIES, MUTATIONS } from '../graphql'

export const TaskTunnel = ({ close }) => {
   const [tags, setTags] = React.useState([])
   const [projects, setProjects] = React.useState([])
   const [upsert, { loading }] = useMutation(MUTATIONS.TASK.CREATE, {
      onCompleted: () => {
         setProjects([])
         setTags([])
         close()
      },
      onError: error => {
         console.error(error)
      },
   })
   const { data: { tags: tags_list = {} } = {} } = useSubscription(QUERIES.TAGS)
   const { data: { projects: projects_list = [] } = {} } = useSubscription(
      QUERIES.PROJECTS
   )

   const onSubmit = e => {
      e.preventDefault()
      const form = new FormData(e.target)
      const task = {
         ...Object.fromEntries(form),
         tags: tags.map(id => ({ tagId: id })),
         projects: projects.map(id => ({ projectId: id })),
      }
      upsert({
         variables: {
            object: {
               title: task.title,
               status: task.status,
               tags: { data: task.tags },
               description: task.description,
               projects: { data: task.projects },
               published_at: format(new Date(), 'yyyy-MM-dd'),
               created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxxxx"),
            },
         },
      })
   }

   const onProjectSelect = e => {
      const { value } = e.target
      if (!projects.includes(value)) {
         setProjects(projects => [...projects, value])
      }
   }

   const onTagSelect = e => {
      const { value } = e.target
      if (!tags.includes(value)) {
         setTags(tags => [...tags, value])
      }
   }

   return (
      <Styles.Wrapper>
         <header css={tw`border-b border-gray-200 p-3`}>
            <h2 css={tw`text-lg text-gray-700`}>Add Task</h2>
         </header>
         <main
            css={tw`p-3`}
            style={{ height: 'calc(100vh - 53px)', overflowY: 'auto' }}
         >
            <form onSubmit={onSubmit} css={tw`space-y-4`}>
               <Styles.Fieldset>
                  <Styles.Label htmlFor="title">Title</Styles.Label>
                  <Styles.Input
                     type="text"
                     name="title"
                     id="title"
                     placeholder="Enter title"
                  />
               </Styles.Fieldset>
               <Styles.Fieldset>
                  <Styles.Label htmlFor="status">Status</Styles.Label>
                  <Styles.Select name="status" id="status">
                     <option value="PENDING">Pending</option>
                     <option value="IN_PROGRESS">In Progress</option>
                     <option value="COMPLETED">Completed</option>
                  </Styles.Select>
               </Styles.Fieldset>
               <Styles.Fieldset>
                  <Styles.Label htmlFor="projects">Project</Styles.Label>
                  <Styles.Select
                     value=""
                     id="projects"
                     name="projects"
                     onChange={onProjectSelect}
                  >
                     <option value="">{projects.length} selected</option>
                     {projects_list.length > 0 &&
                        projects_list.map(project => (
                           <option key={project.id} value={project.id}>
                              {project.title}
                           </option>
                        ))}
                  </Styles.Select>
               </Styles.Fieldset>
               <Styles.Fieldset>
                  <Styles.Label htmlFor="tags">Tags</Styles.Label>
                  <Styles.Select
                     value=""
                     id="tags"
                     name="tags"
                     onChange={onTagSelect}
                  >
                     <option value="">{tags.length} selected</option>
                     {tags_list?.aggregate?.count > 0 &&
                        tags_list?.nodes?.map(tag => (
                           <option key={tag.id} value={tag.id}>
                              {tag.title}
                           </option>
                        ))}
                  </Styles.Select>
               </Styles.Fieldset>
               <Styles.Fieldset>
                  <Styles.Label htmlFor="description">Description</Styles.Label>
                  <Styles.Textarea
                     rows="4"
                     id="description"
                     name="description"
                     placeholder="Enter description"
                  />
               </Styles.Fieldset>
               <button
                  type="submit"
                  disabled={loading}
                  css={tw`mr-2 text-sm font-medium uppercase tracking-wider rounded text-white bg-green-500 h-10 px-4`}
               >
                  {loading ? 'Creating' : 'Create'}
               </button>
               <button
                  css={tw`text-sm font-medium uppercase tracking-wider rounded h-10 px-4 text-gray-600 hover:bg-gray-100`}
                  type="button"
                  onClick={close}
               >
                  Cancel
               </button>
            </form>
            <div css={tw`h-4`} />
         </main>
      </Styles.Wrapper>
   )
}

const Styles = {
   Wrapper: styled.div`
      z-index: 1001;
      ${tw`absolute bg-white`}
      @media screen and (max-width: 567px) {
         ${tw`inset-0`}
      }
      @media screen and (min-width: 568px) {
         width: 480px;
         ${tw`right-0 top-0 bottom-0 shadow-xl`}
      }
   `,
   Fieldset: styled.fieldset`
      ${tw`flex flex-col`}
   `,
   Label: styled.label`
      ${tw`mb-1 text-gray-600`}
   `,
   Input: styled.input`
      ${tw`h-10 px-2 border rounded`}
   `,
   Textarea: styled.textarea`
      ${tw`px-2 pt-2 border rounded`}
   `,
   Select: styled.select`
      ${tw`h-10 px-2 border rounded`}
   `,
}

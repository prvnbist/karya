import React from 'react'
import tw from 'twin.macro'
import { useMutation } from '@apollo/client'
import { useSession } from 'next-auth/client'

import { useGlobal } from '../store/global'
import { MUTATIONS } from '../graphql/mutations'

export const Form = () => {
   const [session] = useSession()
   const [errors, setErrors] = React.useState({ title: '' })
   const { form, toggle_form_modal, set_form, clear_form } = useGlobal()
   const [addTask] = useMutation(MUTATIONS.TASK.UPSERT, {
      onCompleted: () => {
         toggle_form_modal()
         clear_form()
      },
      onError: error => {
         console.error(error)
      },
   })

   const createTask = () => {
      if (!form.title.trim()) {
         setErrors(errors => ({ ...errors, title: 'Please add a title!' }))
         return
      }

      setErrors(errors => ({ ...errors, title: '' }))
      addTask({ variables: { object: { user_id: session.user?.id, ...form } } })
   }

   return (
      <div tw="fixed inset-0 z-10 bg-black bg-opacity-50 py-5 overflow-y-auto">
         <div tw="bg-white w-11/12 sm:w-4/6 lg:w-3/6 max-w-xl mx-auto rounded-lg z-10">
            <header tw="flex flex-row items-center justify-between p-5 border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
               <p tw="text-lg font-semibold text-gray-800">Add Task</p>
               <button
                  onClick={() => {
                     toggle_form_modal()
                     clear_form()
                  }}
                  tw="flex items-center justify-center h-8 w-8 rounded hover:bg-gray-200"
               >
                  <svg
                     tw="w-5 h-5"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                     ></path>
                  </svg>
               </button>
            </header>
            <main tw="p-5 pt-4">
               <fieldset>
                  <label
                     tw="text-sm block mb-1 font-medium text-gray-700"
                     htmlFor="title"
                  >
                     Title
                  </label>
                  <input
                     type="text"
                     id="title"
                     name="title"
                     value={form.title}
                     onChange={e => set_form({ title: e.target.value })}
                     tw="w-full h-10 px-2 rounded border border-gray-300"
                  />
                  {errors?.title && (
                     <span tw="text-red-500">{errors?.title}</span>
                  )}
               </fieldset>
               <fieldset tw="mt-4">
                  <label
                     tw="text-sm block mb-1 font-medium text-gray-700"
                     htmlFor="description"
                  >
                     Description
                  </label>
                  <textarea
                     rows="5"
                     id="description"
                     name="description"
                     value={form.description}
                     onChange={e => set_form({ description: e.target.value })}
                     tw="pt-1 w-full max-h-40 px-2 rounded border border-gray-300"
                  />
               </fieldset>
               <fieldset tw="mt-4">
                  <span tw="text-sm block mb-1 font-medium text-gray-700">
                     Status
                  </span>
                  <section tw="gap-1 p-1 flex flex-col md:flex-row items-center justify-around border border-gray-300 rounded">
                     <StatusOption
                        title="Pending"
                        value="PENDING"
                        set_form={set_form}
                        status={form.status}
                     />
                     <StatusOption
                        title="In Progress"
                        value="IN_PROGRESS"
                        set_form={set_form}
                        status={form.status}
                     />
                     <StatusOption
                        title="Completed"
                        value="COMPLETED"
                        set_form={set_form}
                        status={form.status}
                     />
                  </section>
               </fieldset>
               <fieldset tw="mt-4">
                  <label
                     tw="text-sm block mb-1 font-medium text-gray-700"
                     htmlFor="date"
                  >
                     Date
                  </label>
                  <input
                     type="date"
                     name="date"
                     id="date"
                     value={form.date}
                     onChange={e => set_form({ date: e.target.value })}
                     tw="w-full h-10 px-2 rounded border border-gray-300"
                  />
               </fieldset>
               <button
                  type="submit"
                  disabled={!form.title.trim()}
                  onClick={createTask}
                  css={[
                     tw`h-10 w-full rounded bg-green-600 text-white mt-4 disabled:(cursor-not-allowed text-gray-700 bg-gray-300)`,
                  ]}
               >
                  Add Task
               </button>
            </main>
         </div>
      </div>
   )
}

const StatusOption = ({ status, title, value, set_form }) => {
   return (
      <label
         onClick={() => set_form({ status: value })}
         css={[
            tw`w-full cursor-pointer flex justify-center flex-1 py-2 rounded`,
            status === value ? tw`bg-green-600` : tw`hover:bg-gray-300`,
         ]}
      >
         <input tw="hidden" type="radio" name="status" id="status" />
         <span
            css={[
               tw`text-sm uppercase tracking-wide font-medium text-gray-500`,
               status === value && tw`text-white`,
            ]}
         >
            {title}
         </span>
      </label>
   )
}

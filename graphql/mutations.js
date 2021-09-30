import { gql } from '@apollo/client'

export const MUTATIONS = {
   TASK: {
      UPSERT: gql`
         mutation insert_task($object: tasks_task_insert_input!) {
            insert_task(
               object: $object
               on_conflict: {
                  constraint: task_pkey
                  update_columns: [title, description, status, date]
               }
            ) {
               id
               title
            }
         }
      `,
   },
}

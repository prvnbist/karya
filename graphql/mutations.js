import { gql } from '@apollo/client'

export const MUTATIONS = {
   TASK: {
      CREATE: gql`
         mutation insert_task($object: task_insert_input!) {
            insert_task(
               object: $object
               on_conflict: {
                  constraint: task_pkey
                  update_columns: [title, description, status, due_date]
               }
            ) {
               id
               title
            }
         }
      `,
   },
}

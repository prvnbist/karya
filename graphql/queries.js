import { gql } from '@apollo/client'

export const QUERIES = {
   PROJECTS: gql`
      subscription projects {
         projects(order_by: { title: asc }) {
            id
            title
            description
         }
      }
   `,
   PROJECT: gql`
      subscription project($id: uuid!) {
         project(id: $id) {
            id
            title
            created_at
            description
         }
      }
   `,
   TASKS: gql`
      subscription tasks($where: task_bool_exp!, $order_by: [task_order_by!]) {
         tasks(where: $where, order_by: $order_by) {
            id
            title
            created_at
            description
            tags(order_by: { created_at: desc }) {
               tag {
                  id
                  title
               }
            }
         }
      }
   `,
}

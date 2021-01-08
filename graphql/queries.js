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
   TASKS: gql`
      subscription tasks($where: task_bool_exp!) {
         tasks(where: $where) {
            id
            title
            description
         }
      }
   `,
}

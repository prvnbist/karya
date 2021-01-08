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
      subscription tasks($where: task_bool_exp!) {
         tasks(where: $where) {
            id
            title
            created_at
            description
         }
      }
   `,
}

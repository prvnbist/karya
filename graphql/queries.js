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
}

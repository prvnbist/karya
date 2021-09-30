import { gql } from '@apollo/client'

export const QUERIES = {
   DATES: gql`
      subscription dates(
         $user_id: String = ""
         $where: tasks_dates_bool_exp = {}
      ) {
         dates: tasks_dates(where: $where) {
            day
            date
            title
            tasks: tasks_aggregate(where: { user_id: { _eq: $user_id } }) {
               aggregate {
                  count
               }
               nodes {
                  id
                  date
                  title
                  status
               }
            }
         }
      }
   `,
}

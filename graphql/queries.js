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
   PROJECT_AGGREGATE: gql`
      subscription projects(
         $where: project_bool_exp = {}
         $order_by: [project_order_by!] = {}
      ) {
         projects: project_aggregate(where: $where, order_by: $order_by) {
            aggregate {
               count(columns: id)
            }
         }
      }
   `,
   TASKS: gql`
      subscription tasks($where: task_bool_exp!, $order_by: [task_order_by!]) {
         tasks: task_aggregate(where: $where, order_by: $order_by) {
            aggregate {
               count
            }
            nodes {
               id
               title
               status
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
      }
   `,
   TAG: gql`
      subscription tag($id: uuid!) {
         tag(id: $id) {
            id
            title
            tasks: tasks_aggregate(
               where: { task: { status: { _neq: "ARCHIVED" } } }
               order_by: { created_at: desc }
            ) {
               aggregate {
                  count
               }
               nodes {
                  task {
                     id
                     title
                     status
                     created_at
                     description
                     tags {
                        tag {
                           id
                           title
                        }
                     }
                  }
               }
            }
         }
      }
   `,
   TAGS: gql`
      subscription tags {
         tags: tag_aggregate(order_by: { title: asc }) {
            aggregate {
               count(columns: id)
            }
            nodes {
               id
               title
               tasks: tasks_aggregate(
                  where: { task: { status: { _neq: "ARCHIVED" } } }
               ) {
                  aggregate {
                     count
                  }
               }
            }
         }
      }
   `,
   TAG_AGGREGATE: gql`
      subscription tags {
         tags: tag_aggregate(order_by: { title: asc }) {
            aggregate {
               count(columns: id)
            }
         }
      }
   `,
}

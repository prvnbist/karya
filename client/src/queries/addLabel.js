import gql from 'graphql-tag'

const ADD_LABEL = gql`
   mutation addLabel($title: String!) {
      addLabel(title: $title) {
         ... on LabelSuccess {
            success
            data {
               id
               title
               todos_count
               createdAt
               updatedAt
            }
         }
         ... on Error {
            success
            error
         }
      }
   }
`

export default ADD_LABEL

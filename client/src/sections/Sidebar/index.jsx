import React from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

// State
import { Context } from '../../context'

// Logo
import Logo from '../../assets/logo'

// Styles
import {
   StyledSidebar,
   Label,
   Title,
   NoLabels,
   Count,
   CreateLabelForm,
} from './styles'

// Queries
import { GET_LABELS, ADD_LABEL } from '../../queries'

// Assets
import { LabelIcon, AddIcon } from '../../assets/icons'

const Sidebar = () => {
   const { state, dispatch } = React.useContext(Context)
   const { loading, error, data } = useQuery(GET_LABELS)
   const [label, setLabel] = React.useState('')
   const [isCreateLabelVisible, setIsCreateLabelVisible] = React.useState(false)

   React.useEffect(() => {
      if (data?.labels) {
         const labels = data.labels.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
         )
         dispatch({ type: 'SET_LABELS', payload: labels })
      }
   }, [data])

   const client = useApolloClient()
   const [addLabel] = useMutation(ADD_LABEL, {
      onCompleted: ({ addLabel: { data: label } }) => {
         const { labels } = client.readQuery({ query: GET_LABELS })
         client.writeQuery({
            query: GET_LABELS,
            data: { labels: [label, ...labels] },
         })
      },
   })

   if (loading) return 'Loading...'
   if (error) return `Error! ${error.message}`
   return (
      <StyledSidebar>
         <header>
            <Logo />
         </header>
         <main>
            <div>
               <h3>Labels</h3>
               <span
                  onClick={() => setIsCreateLabelVisible(!isCreateLabelVisible)}
               >
                  <AddIcon />
               </span>
            </div>
            {isCreateLabelVisible && (
               <CreateLabelForm>
                  <input
                     type="text"
                     value={label}
                     placeholder="Enter label name"
                     onChange={e => setLabel(e.target.value)}
                  />
                  <button
                     onClick={() => {
                        label &&
                           addLabel({
                              variables: {
                                 title: label,
                              },
                           })
                        setLabel('')
                        setIsCreateLabelVisible(false)
                     }}
                  >
                     Add
                  </button>
               </CreateLabelForm>
            )}
            <ul>
               {state.labels.length > 0 &&
                  state.labels.map(label => (
                     <Label key={label.id}>
                        <Title>
                           <span>
                              <LabelIcon />
                           </span>
                           <h4>{label.title}</h4>
                        </Title>
                        {label.todos_count > 0 && (
                           <Count>{label.todos_count}</Count>
                        )}
                     </Label>
                  ))}
               {state.labels.length === 0 && <NoLabels>No labels</NoLabels>}
            </ul>
         </main>
      </StyledSidebar>
   )
}

export default Sidebar

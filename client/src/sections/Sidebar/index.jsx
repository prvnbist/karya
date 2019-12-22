import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// State
import { Context } from '../../context'

// Logo
import Logo from '../../assets/logo'

// Styles
import { StyledSidebar, Label, Title, NoLabels, Count } from './styles'

// Assets
import { LabelIcon } from '../../assets/icons'
import { GET_LABELS } from '../../queries'

const Sidebar = () => {
   const { state, dispatch } = React.useContext(Context)
   const { loading, error, data } = useQuery(GET_LABELS)

   React.useEffect(() => {
      if (data?.labels) {
         const labels = data.labels.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
         )
         dispatch({ type: 'SET_LABELS', payload: labels })
      }
   }, [data])

   if (loading) return 'Loading...'
   if (error) return `Error! ${error.message}`
   return (
      <StyledSidebar>
         <header>
            <Logo />
         </header>
         <main>
            <h3>Labels</h3>
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

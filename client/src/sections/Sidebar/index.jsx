import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'

// State
import { Context } from '../../context'

// Logo
import Logo from '../../assets/logo'

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

const StyledSidebar = styled.div`
   header {
      width: 100%;
      height: 40px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      padding: 0 16px;
   }
   main {
      h3 {
         padding: 0 16px;
         color: #bac0cf;
         font-size: 14px;
         letter-spacing: 0.5px;
         text-transform: uppercase;
         margin-bottom: 8px;
      }
   }
`

const NoLabels = styled.li`
   height: 32px;
   padding: 0 16px;
   list-style: none;
`

const Label = styled.li`
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 32px;
   padding: 0 16px;
   border-radius: 4px;
   cursor: pointer;
   &:hover {
      background: #f1eeff;
      div {
         h4 {
            color: #6d51f4;
         }
         span {
            path {
               stroke: #6d51f4;
            }
            circle {
               fill: #6d51f4;
            }
         }
      }
      > span {
         color: #fff;
         background: #6d51f4;
      }
   }
`

const Title = styled.div`
   display: flex;
   align-items: center;
   height: inherit;
   span {
      margin-right: 12px;
      display: flex;
      align-items: center;
      height: inherit;
   }
   h4 {
      font-size: 16px;
      line-height: 18px;
      color: #8e929d;
      font-weight: 500;
   }
`

const Count = styled.span`
   background: #ebedf2;
   height: 18px;
   padding: 0 6px;
   border-radius: 18px;
   font-size: 12px;
   line-height: 18px;
   color: #8e929d;
`

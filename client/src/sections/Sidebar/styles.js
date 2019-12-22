import styled from 'styled-components'

export const StyledSidebar = styled.div`
   header {
      width: 100%;
      height: 40px;
      margin: 16px 0;
      display: flex;
      align-items: center;
      padding: 0 16px;
   }
   main {
      > div:first-child {
         height: 24px;
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 0 16px;
         span {
            width: 24px;
            height: 24px;
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            svg {
               stroke: #8e929d;
            }
         }
      }
      h3 {
         color: #bac0cf;
         font-size: 14px;
         letter-spacing: 0.5px;
         text-transform: uppercase;
      }
   }
`

export const CreateLabelForm = styled.div`
   display: grid;
   align-items: center;
   grid-template-columns: 1fr auto;
   grid-column-gap: 12px;
   height: 40px;
   padding: 0 16px;
   input,
   button {
      height: 28px;
      border-radius: 4px;
   }
   input {
      width: 100%;
      font-size: 13px;
      padding-left: 8px;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
      &:focus {
         outline: 1px solid #6d51f4;
      }
   }
   button {
      padding: 0 6px;
      background: transparent;
      border: 1px solid #6d51f4;
      &:focus {
         outline: 1px solid #6d51f4;
      }
   }
`

export const NoLabels = styled.li`
   height: 32px;
   padding: 0 16px;
   list-style: none;
`

export const Label = styled.li`
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

export const Title = styled.div`
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

export const Count = styled.span`
   background: #ebedf2;
   height: 18px;
   padding: 0 6px;
   border-radius: 18px;
   font-size: 12px;
   line-height: 18px;
   color: #8e929d;
`

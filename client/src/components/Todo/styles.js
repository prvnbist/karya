import styled from 'styled-components'

export const ListItem = styled.li`
   width: 100%;
   height: 40px;
   padding: 12px;
   display: flex;
   list-style: none;
   border-radius: 4px;
   align-items: center;
   transition: 0.2s ease-in-out;
   justify-content: space-between;
   &:hover {
      background: #f7f7fb;
      button {
         display: flex;
      }
   }
   button {
      width: 24px;
      height: 24px;
      border: none;
      display: none;
      cursor: pointer;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background: transparent;
      &:hover {
         background: #6d51f4;
         svg {
            stroke: #fff;
         }
      }
   }
`

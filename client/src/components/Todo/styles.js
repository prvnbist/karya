import styled from 'styled-components'

export const ListItem = styled.li`
   width: 100%;
   height: 40px;
   padding: 12px;
   display: flex;
   list-style: none;
   border-radius: 4px;
   align-items: center;
   justify-content: space-between;
   &:hover {
      color: #fff;
      background: #6d51f4;
      button {
         display: flex;
      }
      & > div {
         span {
            color: #fff;
         }
      }
   }
   & > div {
      display: flex;
      align-items: center;
      span {
         color: #cec9c9;
      }
   }
   button {
      width: 24px;
      height: 24px;
      border: none;
      display: none;
      cursor: pointer;
      margin-left: 8px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background: transparent;
      &:hover {
         background: #fff;
         svg {
            stroke: #6d51f4;
         }
      }
   }
`

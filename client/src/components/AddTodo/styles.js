import styled from 'styled-components'

export const Form = styled.form`
   height: 56px;
   display: grid;
   margin-bottom: 8px;
   align-items: center;
   grid-column-gap: 16px;
   grid-template-columns: 1fr auto;
   input {
      height: 40px;
      font-size: 16px;
      padding-left: 12px;
      border-radius: 4px;
      border: 1px solid #d0d0d0;
      &:focus {
         outline: 1px solid #6d51f4;
      }
   }
   button {
      color: #fff;
      border: none;
      height: 40px;
      font-size: 16px;
      padding: 0 12px;
      border-radius: 4px;
      background: #6d51f4;
      display: flex;
      align-items: center;
      svg {
         margin-right: 4px;
      }
   }
`

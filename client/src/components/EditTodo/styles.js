import styled from 'styled-components'

export const Form = styled.form`
   height: 40px;
   display: grid;
   margin: 16px 0;
   align-items: center;
   grid-column-gap: 16px;
   grid-template-columns: 1fr auto auto;
   input,
   select {
      height: 40px;
      font-size: 16px;
      padding-left: 12px;
      border-radius: 4px;
      border: 1px solid #e6e6e6;
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

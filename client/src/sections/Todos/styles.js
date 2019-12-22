import styled from 'styled-components'

export const Wrapper = styled.div`
   margin: 0 auto;
   width: 100%;
   padding: 0 16px;
   ul {
      margin-bottom: 16px;
   }
`

export const Empty = styled.div`
   width: 100%;
   height: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 0 12px;
   position: relative;
   span {
      background: #fff;
      padding: 0 8px;
   }
   &:before {
      content: '';
      width: 100%;
      height: 2px;
      top: 20px;
      z-index: -1;
      position: absolute;
      background: #f5e7e7;
   }
`

export const Heading = styled.h3`
   color: #fff;
   font-size: 14px;
   padding: 0 10px;
   height: 20px;
   line-height: 20px;
   margin-bottom: 8px;
   border-radius: 16px;
   display: inline-block;
   &:nth-of-type(1) {
      color: #7358f6;
      background: #d1e6ff;
   }
   &:nth-of-type(2) {
      color: #585454;
      background: #e8e7ec;
   }
   &:nth-of-type(3) {
      color: #2db52d;
      background: #9dfb9d;
   }
   span {
      width: 8px;
      height: 8px;
      margin-right: 2px;
      border-radius: 8px;
      background: #fff;
      display: inline-block;
      transform: translate(-3px, -1px);
      box-shadow: 1px 0 8px -0.5px rgba(0, 0, 0, 0.2);
   }
`

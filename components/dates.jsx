import tw, { styled } from 'twin.macro'

import DateItem from './date'

export const Dates = ({ dates = [] }) => {
   return (
      <Layout>
         {dates.map((node, index) => (
            <DateItem date={node} key={node.date} />
         ))}
      </Layout>
   )
}

const Layout = styled.ul`
   ${tw`flex-1 grid gap-4`}
   grid-template-columns: repeat(5, 1fr);
   @media (max-width: 768px) {
      grid-template-columns: 1fr;
   }
   > li {
      min-height: 320px;
   }
`

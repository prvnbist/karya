import tw from 'twin.macro'

import DateItem from './date'

export const Dates = ({ dates = [] }) => {
   return (
      <ul tw="flex-1 h-full grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-4">
         {dates.map((node, index) => (
            <DateItem date={node} key={node.date} />
         ))}
      </ul>
   )
}

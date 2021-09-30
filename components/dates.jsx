import tw from 'twin.macro'

import Date from './date'
import AddTask from './add_task'

export const Dates = ({ dates = [] }) => {
   return (
      <ul tw="flex-1 h-full grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 gap-4">
         {dates.map((node, index) => (
            <Date
               date={node}
               key={node.date}
               isWeekend={[5, 6].includes(index)}
            />
         ))}
      </ul>
   )
}

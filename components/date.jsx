import tw from 'twin.macro'
import { isToday, isSunday, isSaturday } from 'date-fns'

import Task from './task'
import AddTask from './add_task'

const DateItem = ({ date = {} }) => {
   const isWeekend =
      isSaturday(new Date(date.date)) || isSunday(new Date(date.date))
   return (
      <li
         css={[
            isWeekend ? tw`lg:col-start-6` : tw`lg:row-start-1 lg:row-end-3`,
         ]}
      >
         <header
            css={[
               tw`border-b border-b-2 border-gray-800 flex items-center justify-between`,
               isToday(new Date(date.date)) &&
                  tw`text-indigo-500 border-indigo-500`,
            ]}
         >
            <span tw="text-lg font-bold">{date.title}</span>
            <span tw="text-lg font-medium text-gray-400">{date.day}</span>
         </header>
         <main>
            <ul>
               {date.tasks.nodes.map(task => (
                  <Task task={task} key={task.id} />
               ))}
               <AddTask date={date.date} />
            </ul>
         </main>
      </li>
   )
}

export default DateItem

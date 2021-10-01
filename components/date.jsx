import tw from 'twin.macro'
import { isToday } from 'date-fns'

import Task from './task'
import AddTask from './add_task'

const DateItem = ({ date = {} }) => {
   return (
      <li>
         <header
            css={[
               tw`border-b border-b-2 border-dark-100 flex items-center justify-between text-gray-300`,
               isToday(new Date(date.date)) &&
                  tw`text-yellow-200 border-yellow-200`,
            ]}
         >
            <span tw="text-lg font-medium">{date.title}</span>
            <span tw="text-lg font-medium text-gray-500">{date.day}</span>
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

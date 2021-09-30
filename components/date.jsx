import tw from 'twin.macro'

import Task from './task'
import AddTask from './add_task'

const Date = ({ date, isWeekend }) => {
   return (
      <li
         css={[
            isWeekend ? tw`lg:col-start-6` : tw`lg:row-start-1 lg:row-end-3`,
         ]}
      >
         <header tw="border-b border-gray-300 flex items-center justify-between">
            <span tw="text-lg font-medium">{date.title}</span>
            <span tw="text-lg font-medium text-gray-400">{date.day}</span>
         </header>
         <main>
            <ul tw="pt-2">
               {date.tasks.nodes.map(task => (
                  <Task task={task} key={task.id} />
               ))}
               <AddTask date={date.date} />
            </ul>
         </main>
      </li>
   )
}

export default Date

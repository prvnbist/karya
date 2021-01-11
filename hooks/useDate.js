import React from 'react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'

export const useDate = () => {
   const [current, setCurrent] = React.useState(
      format(new Date(), 'yyyy-MM-dd')
   )
   const week = {
      start: startOfWeek(new Date(current), { weekStartsOn: 1 }),
      end: endOfWeek(new Date(current), { weekStartsOn: 1 }),
      days: function () {
         return eachDayOfInterval({
            start: this.start,
            end: this.end,
         }).map(date => ({
            value: format(date, 'yyyy-MM-dd'),
            display: format(date, 'E d'),
         }))
      },
   }

   return { current, setCurrent, week }
}

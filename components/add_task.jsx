import tw from 'twin.macro'

import * as Icon from '../icons'
import { useGlobal } from '../store/global'

const AddTask = ({ date }) => {
   const { toggle_form_modal, set_form } = useGlobal()
   return (
      <li
         onClick={() => {
            toggle_form_modal()
            set_form({ date })
         }}
         tw="text-sm cursor-pointer h-10 flex items-center text-dark-100 border-b border-dark-200 hover:(border-dark-100)"
      >
         <span tw="flex h-10 w-10 items-center justify-center">
            <Icon.Add css={tw`stroke-current text-dark-100`} />
         </span>
         Add task
      </li>
   )
}

export default AddTask

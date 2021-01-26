import React from 'react'
import tw from 'twin.macro'

export const Accordian = ({ children }) => {
   const [head, content] = children
   const [isOpen, toggle] = React.useState(false)
   return (
      <section>
         <header
            onClick={() => toggle(!isOpen)}
            css={tw`h-8 border rounded flex items-center px-2 cursor-pointer`}
         >
            {head}
         </header>
         <span css={tw`block h-1`} />
         {isOpen && (
            <main>
               {content}
               <span css={tw`block h-2`} />
            </main>
         )}
      </section>
   )
}
Accordian.Head = ({ children }) => (
   <h1 css={tw`uppercase text-sm font-medium text-gray-600`}>{children}</h1>
)
Accordian.Content = ({ children }) => <div>{children}</div>

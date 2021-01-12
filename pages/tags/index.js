import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import { useSubscription } from '@apollo/client'

import Icon from '../../icons'
import { QUERIES } from '../../graphql'
import { Loader, Tag } from '../../components'

export default function Tags() {
   const router = useRouter()
   const [tags, setTags] = React.useState({})
   const { loading, data: { tags: list = {} } = {} } = useSubscription(
      QUERIES.TAGS
   )

   React.useEffect(() => {
      if (!loading && list.nodes.length > 0) {
         const result = {}
         list.nodes.forEach(node => {
            const { title = '' } = node
            if (title.trim()) {
               const [letter] = title
               if (letter in result) {
                  result[letter].push(node)
               } else {
                  result[letter] = [node]
               }
            }
         })
         setTags(result)
      }
   }, [loading, list])

   return (
      <div>
         <Head>
            <title>Tags | Karya App</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main>
            <header
               css={tw`sticky top-0 bg-gray-100 flex items-center border-b border-gray-300 py-2 mb-3 space-x-2`}
            >
               <span
                  onClick={() => router.push('/')}
                  css={tw`inline-flex items-center justify-center h-10 w-10 cursor-pointer`}
               >
                  <Icon.Home size="22" css={tw`stroke-current text-gray-700`} />
               </span>
               <h1 css={tw`text-2xl text-gray-800`}>
                  Tags ({list?.aggregate?.count || 0})
               </h1>
            </header>
            {loading ? (
               <div css={tw`h-12`}>
                  <Loader />
               </div>
            ) : (
               <>
                  {tags.length === 0 ? (
                     <span>No tags available.</span>
                  ) : (
                     <ul css={tw`space-y-4`}>
                        {Object.keys(tags).map(letter => (
                           <li key={letter}>
                              <h2
                                 css={tw`border-b border-gray-300 py-2 uppercase font-medium text-gray-700 text-lg`}
                              >
                                 {letter}
                              </h2>
                              <section
                                 css={tw`flex items-center pt-2 space-x-2`}
                              >
                                 {tags[letter].map(tag => (
                                    <Link href={`/tags/${tag.id}`}>
                                       <a>
                                          <Tag tag={tag} />
                                       </a>
                                    </Link>
                                 ))}
                              </section>
                           </li>
                        ))}
                     </ul>
                  )}
               </>
            )}
         </main>
      </div>
   )
}

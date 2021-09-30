import { GlobalStyles } from 'twin.macro'

import '../styles/global.css'
import Auth from '../lib/auth'
import Apollo from '../lib/apollo'
import StateProvider from '../store/global'

const App = ({ Component, pageProps }) => {
   return (
      <>
         <GlobalStyles />
         <Auth>
            <Apollo>
               <StateProvider>
                  <Component {...pageProps} />
               </StateProvider>
            </Apollo>
         </Auth>
      </>
   )
}

export default App

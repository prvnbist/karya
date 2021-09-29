import tw, { GlobalStyles } from 'twin.macro'

import '../styles/global.css'
import Auth from '../lib/auth'
import Apollo from '../lib/apollo'

const App = ({ Component, pageProps }) => {
   return (
      <>
         <GlobalStyles />
         <Auth>
            <Apollo>
               <Component {...pageProps} />
            </Apollo>
         </Auth>
      </>
   )
}

export default App

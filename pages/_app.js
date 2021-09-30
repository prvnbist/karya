import { GlobalStyles } from 'twin.macro'
import { Provider } from 'next-auth/client'

import '../styles/global.css'
import Apollo from '../lib/apollo'
import StateProvider from '../store/global'

const App = ({ Component, pageProps }) => {
   return (
      <Provider session={pageProps.session}>
         <GlobalStyles />
         <Apollo>
            <StateProvider>
               <Component {...pageProps} />
            </StateProvider>
         </Apollo>
      </Provider>
   )
}

export default App

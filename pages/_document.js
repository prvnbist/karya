import Document, { Html, Head, Main, NextScript } from 'next/document'

import tw from 'twin.macro'

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
   }

   render() {
      return (
         <Html lang="en">
            <Head>
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link
                  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                  rel="stylesheet"
               />
            </Head>
            <body css={tw`overflow-hidden m-0 h-screen w-screen`}>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument

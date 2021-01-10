import tw, { styled } from 'twin.macro'

export const Loader = () => (
   <Styles.Loader css={tw`h-full w-full flex items-center justify-center`}>
      <div>Loading...</div>
   </Styles.Loader>
)

const Styles = {
   Loader: styled.div`
      > div,
      > div:before,
      > div:after {
         border-radius: 50%;
         width: 1.5em;
         height: 1.5em;
         -webkit-animation-fill-mode: both;
         animation-fill-mode: both;
         -webkit-animation: load7 1.8s infinite ease-in-out;
         animation: load7 1.8s infinite ease-in-out;
      }
      > div {
         color: #d8cece;
         font-size: 8px;
         margin: 0 auto;
         margin-top: -30px;
         position: relative;
         text-indent: -9999em;
         transform: translateZ(0);
         animation-delay: -0.16s;
      }
      > div:before,
      > div:after {
         content: '';
         position: absolute;
         top: 0;
      }
      > div:before {
         left: -3.5em;
         -webkit-animation-delay: -0.32s;
         animation-delay: -0.32s;
      }
      > div:after {
         left: 3.5em;
      }
      @-webkit-keyframes load7 {
         0%,
         80%,
         100% {
            box-shadow: 0 1.5em 0 -1.3em;
         }
         40% {
            box-shadow: 0 1.5em 0 0;
         }
      }
      @keyframes load7 {
         0%,
         80%,
         100% {
            box-shadow: 0 1.5em 0 -1.3em;
         }
         40% {
            box-shadow: 0 1.5em 0 0;
         }
      }
   `,
}

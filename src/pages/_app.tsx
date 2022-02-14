import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'



function MyApp({ Component, pageProps }: AppProps) {
  return(
   
    <ChakraProvider theme={theme}>
    <Component {...pageProps} />
    <GlobalStyle />
    </ChakraProvider>
 

  )
}

export default MyApp

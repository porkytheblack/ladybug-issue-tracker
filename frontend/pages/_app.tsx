import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;

  }
`

const theme = {
  colors: {
    primary: "black"
  }
}

function MyApp({ Component, pageProps }: AppProps) {

  return    <>
    <GlobalStyles/>
  <ThemeProvider theme={theme} >
            
            <Component {...pageProps} />
          </ThemeProvider> 
          </>
}

export default MyApp

import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { wrapper } from '../redux/Store'
import Layout from '../layouts'

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;

  }
`

const theme = {
  
}

function MyApp({ Component, pageProps }: AppProps) {

  return    <>
          <GlobalStyles/>
          <ThemeProvider theme={theme} >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider> 
          </>
}

export default wrapper.withRedux(MyApp)

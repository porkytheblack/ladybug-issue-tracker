import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/globals.css'
import 'instantsearch.css/themes/satellite.css';
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { wrapper } from '../redux/Store'
import Layout from '../layouts'
import { Auth0Provider } from '@auth0/auth0-react'
import Head from 'next/head'
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;

  }
`

const theme = {
  
}

const client = algoliasearch("3W9J6JZQEU", "893665089787aa0e349041379af938b2")

// console.log(client.getLogs())

function MyApp({ Component, pageProps }: AppProps) {

  return    (
      
                  <Auth0Provider domain='dev-1r9889va.us.auth0.com' clientId='Im7sn8k1xfKw0Lb9Btn1TbemThVGtjnR' redirectUri='http://localhost:3000/auth' >
                <Head>
                  <title>LadyBug</title>
                  <meta name="description" content="The only bug tracker you will ever need" />
                  <link rel="icon" href="/icons/logo.svg"  />
                </Head> 
              <GlobalStyles/>
              <ThemeProvider theme={theme} >
              <InstantSearch searchClient={client} indexName='projects' >
                <Layout>

                  <Component {...pageProps} />
                </Layout>
                </InstantSearch>
              </ThemeProvider> 
              </Auth0Provider>
      
  )
  
}

export default wrapper.withRedux(MyApp)

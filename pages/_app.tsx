/* eslint-disable no-console */
import '../public/assets/plugins/nucleo/css/nucleo.css'
import '../public/assets/scss/nextjs-argon-dashboard.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { Provider } from 'mobx-react'
import { GetStaticProps } from 'next'
import { Router } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'

import PageChange from '../components/PageChange/PageChange'
import { useStore } from '../store'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  document.body.classList.add('body-page-transition')
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  )
})
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialState)
  useEffect(() => {
    const comment = document.createComment(`

  =========================================================
  * * NextJS Argon Dashboard v1.0.0 based on Argon Dashboard React v1.1.0
  =========================================================
  
  * Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard
  * Copyright 2020 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/nextjs-argon-dashboard/blob/master/LICENSE.md)
  
  * Coded by Creative Tim
  
  =========================================================
  
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  `)
    document.insertBefore(comment, document.documentElement)
  }, [])

  const Layout = Component.layout || (({ children }) => <>{children}</>)
  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>CCN Dashboard</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

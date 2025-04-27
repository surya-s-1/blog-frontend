import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { useState, useEffect } from 'react'

import { wrapper } from '@/store'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ApolloProvider } from '@apollo/client'
import { client } from '@/../apollo-client'

import Header from '@/components/header'
import TubeSpinnerLoader from '@/components/TubeSpinnerLoader'

function App({ Component, pageProps }: AppProps) {
  const store = useStore()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleStop = () => setLoading(false)

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleStop)
    Router.events.on('routeChangeError', handleStop)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleStop)
      Router.events.off('routeChangeError', handleStop)
    }
  }, [])

  return (
    <PersistGate loading={<TubeSpinnerLoader width={36} />} persistor={store.__persistor}>
      <ApolloProvider client={client}>
        {loading && 
          <div className='fixed bg-default-bg rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.5)] p-2 top-12 left-1/2 transform -translate-x-1/2 z-50'>
            <TubeSpinnerLoader width={36} />
          </div>}
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </PersistGate>
  )
}

export default wrapper.withRedux(App)
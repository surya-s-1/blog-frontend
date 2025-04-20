import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../apollo-client'
import { Provider } from 'react-redux'
import { wrapper } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps)

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  )
}

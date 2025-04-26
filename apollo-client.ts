import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_GQL_API,
  cache: new InMemoryCache(),
})

export const ssrApolloClient = new ApolloClient({
  ssrMode: true,
  uri: process.env.NEXT_PUBLIC_BACKEND_GQL_API,
  cache: new InMemoryCache(),
})
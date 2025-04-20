import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_HOME_FEED } from '@/gql/queries'

import Header from '@/components/header'
import PostContainer from '@/components/container/PostContainer'

export default function Home() {
  const { data, error, loading } = useQuery(GET_HOME_FEED, {
    variables: {
      limit: 5,
      cursor: null
    }
  })

  if (error) {
    console.error(error)
  }

  const posts = data?.getHomeFeed?.posts ?? []

  return (
    <div className='min-h-screen min-w-screen bg-primary-bg'>
      <Header />
      <PostContainer posts={posts} loading={loading} />
    </div>
  )
}
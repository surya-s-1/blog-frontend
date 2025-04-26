import LoadingTubeSpinner from '../../public/loading-tube-spinner.svg'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_HOME_FEED } from '@/gql/queries'

import Header from '@/components/header'
import Frame from '@/components/container/Frame'
import PostContainer from '@/components/container/PostContainer'

import { Post } from '@/components/interfaces/Post'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)

  const { data, error, loading, fetchMore } = useQuery(GET_HOME_FEED, {
    variables: { limit: 5, cursor: null }
  })

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (data?.getHomeFeed) {
      setPosts(prev => [...prev, ...data.getHomeFeed.posts])
      setNextCursor(data.getHomeFeed.nextCursor)
    }
  }, [data])

  async function handleLoadMore() {
    if (!nextCursor) return

    const more = await fetchMore({
      variables: { limit: 5, cursor: nextCursor }
    })

    setPosts(prev => [...prev, ...more.data.getHomeFeed.posts])
    setNextCursor(more.data.getHomeFeed.nextCursor)
  }

  const [loadMoreRef] = useInfiniteScroll(handleLoadMore, nextCursor, loading)

  return (
    <div className='min-h-screen min-w-screen bg-primary-bg'>
      <Header />
      <Frame
        middle={
          <>
          <PostContainer posts={posts} />
          <div ref={loadMoreRef} className='h-fit'>
            {(nextCursor || loading) && <img src={LoadingTubeSpinner.src} width={40}/>}
          </div>
          </>
        }
      />
    </div>
  )
}
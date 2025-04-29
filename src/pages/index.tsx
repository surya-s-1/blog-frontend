import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useLazyQuery } from '@apollo/client'
import { GET_HOME_FEED } from '@/gql/queries'

import Frame from '@/components/container/Frame'
import PostContainer from '@/components/container/PostContainer'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Post } from '@/components/interfaces/Post'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [nextCursor, setNextCursor] = useState<string | Date | null>(null)

  const [getHomeFeed, { data, loading, called, error, fetchMore }] = useLazyQuery(GET_HOME_FEED)

  useEffect(() => {
    getHomeFeed({ variables: { limit: 7, cursor: null } })
  }, [])

  useEffect(() => {
    if (data) {
      setPosts(data.getHomeFeed.posts)
      setNextCursor(data.getHomeFeed.nextCursor)
    }
  }, [data])

  if (error) {
    console.error(error)
  }

  async function handleLoadMore() {
    if (!nextCursor) return

    const { data, error } = await fetchMore({
      variables: { limit: 5, cursor: nextCursor }
    })

    if (data) {
      setPosts((prev) => [...prev, ...data.getHomeFeed.posts])
      setNextCursor(data.getHomeFeed.nextCursor)
    } else {
      console.error('Error while fetching more:', error)
    }
  }

  const [loadMoreRef] = useInfiniteScroll(handleLoadMore, nextCursor, loading)

  return (
    <>
      <Frame
        middle={
        <PostContainer 
          posts={posts} 
          showLoader={(called && loading) || !!nextCursor} 
          loadMoreRef={loadMoreRef} 
        />
        }
      />
    </>
  )
}
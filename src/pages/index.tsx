import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useLazyQuery } from '@apollo/client'
import { GET_HOME_FEED } from '@/gql/queries'

import Frame from '@/components/container/Frame'
import PostContainer from '@/components/container/PostContainer'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { appendHomeFeed, replaceHomeFeed } from '@/store/slices/appSlice'

export default function Home() {
  const posts = useSelector((state: RootState) => state.app.homeFeed.posts)
  const nextCursor = useSelector((state: RootState) => state.app.homeFeed.nextCursor)

  const dispatch = useDispatch()

  const [getHomeFeed, { data, loading, called, error, fetchMore }] = useLazyQuery(GET_HOME_FEED)

  useEffect(() => {
    console.log('posts', posts)
    if (posts.length === 0) {
      getHomeFeed({ variables: { limit: 7, cursor: null } })
    }
  }, [])

  useEffect(() => {
    if (data?.getHomeFeed) {
      dispatch(appendHomeFeed({ ...data.getHomeFeed }))
    }
  }, [data])

  if (error) {
    console.error(error)
  }

  async function handleLoadMore() {
    if (!nextCursor) return

    const more = await fetchMore({
      variables: { limit: 5, cursor: nextCursor }
    })

    dispatch(appendHomeFeed({ ...more.data.getHomeFeed }))
  }

  const [loadMoreRef] = useInfiniteScroll(handleLoadMore, nextCursor, loading)

  return (
    <Frame
      middle={<PostContainer posts={posts} showLoader={(called && loading) || !!nextCursor} loadMoreRef={loadMoreRef} />}
    />
  )
}
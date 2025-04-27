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
    if (posts.length === 0) {
      getHomeFeed({ variables: { limit: 7, cursor: null } })
    }
  }, [])

  useEffect(() => {
    if (data?.getHomeFeed) {
      dispatch(replaceHomeFeed({ ...data.getHomeFeed }))
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
      dispatch(appendHomeFeed({ ...data.getHomeFeed }))
    } else {
      console.error('Error while fetching more:', error)
    }
  }

  const [loadMoreRef] = useInfiniteScroll(handleLoadMore, nextCursor, loading)

  return (
    <>
      <Frame
        middle={
        <>
        <button
          className='sticky top-18 z-10 mx-auto block button-default-inverse'
          onClick={() => getHomeFeed({ variables: { limit: 7, cursor: null } })}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Feed'}
        </button>
        <PostContainer 
          posts={posts} 
          showLoader={(called && loading) || !!nextCursor} 
          loadMoreRef={loadMoreRef} 
        />
        </>
        }
      />
    </>
  )
}
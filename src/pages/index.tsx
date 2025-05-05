import { useState } from 'react'
import { ssrApolloClient } from '@/../../apollo-client'
import { useLazyQuery } from '@apollo/client'
import { GET_HOME_FEED } from '@/gql/queries'

import Frame from '@/components/container/Frame'
import PostContainer from '@/components/container/PostContainer'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Post } from '@/components/interfaces/Post'
import { InferGetServerSidePropsType } from 'next'
import ExpandedPostModal from '@/components/container/ExpandedPostModal'

export const getServerSideProps = async () => {
  try {
      const { data, error } = await ssrApolloClient.query({
          query: GET_HOME_FEED,
          variables: { limit: 7, nextCursor: null }
      })

      if (error) {
          console.error(error)
          throw new Error(error?.message)
      }

      return {
          props: {
              posts: data.getHomeFeed.posts as Post[],
              nextCursor: data.getHomeFeed.nextCursor as string | Date | null,
              error: null
          }
      }
  } catch (err) {
      console.error(err)

      return {
          props: {
              posts: [],
              nextCursor: null,
              error: 'Failed to fetch home feed'
          }
      }
  }
}

export default function Home({ posts: initialPosts, nextCursor: initialCursor, error: initialError }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [nextCursor, setNextCursor] = useState<string | Date | null>(initialCursor)

  const [getHomeFeed, { loading }] = useLazyQuery(GET_HOME_FEED)

  async function handleLoadMore() {
    if (!nextCursor) return

    const { data, error } = await getHomeFeed({
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
          showLoader={!!nextCursor} 
          loadMoreRef={loadMoreRef} 
        />
        }
      />
      <ExpandedPostModal />
      </>
  )
}
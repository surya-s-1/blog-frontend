import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_HOME_FEED } from '@/gql/queries'

import Header from '@/components/header'
import PostContainer from '@/components/container/PostContainer'
import { Post } from '@/components/interfaces/Post'

import LoadingTubeSpinner from '../../public/loading-tube-spinner.svg'

export default function Home() {
  const { data, error, loading, fetchMore } = useQuery(GET_HOME_FEED, {
    variables: { limit: 5, cursor: null }
  })

  if (error) {
    console.error(error)
  }

  const [posts, setPosts] = useState<Post[]>([])
  const [nextCursor, setNextCursor] = useState<string>()

  const loader = useRef(null)

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          handleLoadMore()
        }
      },
      { threshold: 1 }
    )

    if (loader.current) observer.observe(loader.current)

    return () => {
      if (loader.current) observer.unobserve(loader.current)
    }
  }, [loader.current, nextCursor, loading])

  return (
    <div className='min-h-screen min-w-screen bg-primary-bg'>
      <Header />
      <PostContainer posts={posts} />
      <div ref={loader} className='h-fit'>
        {(nextCursor || loading) && <img src={LoadingTubeSpinner.src} width={40}/>}
      </div>
    </div>
  )
}
import { useEffect, useRef } from 'react'

export function useInfiniteScroll(
    handleLoadMore: () => void,
    nextCursor: string | Date | null,
    loading: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!nextCursor || loading) return

    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore()
        }
      },
      { threshold: 0.75 }
    )

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (loadMoreRef.current && observerRef.current) observerRef.current.unobserve(loadMoreRef.current)
    }
  }, [loadMoreRef.current, nextCursor, loading])

  return [loadMoreRef]
}
import { Ref } from 'react'

import PostCard from '@/components/post/PostCard'
import TubeSpinnerLoader from '@/components/TubeSpinnerLoader'
import { Post } from '@/components/interfaces/Post'

interface PostContainerInterface {
    posts: Post[]
    showLoader: boolean
    loadMoreRef: Ref<HTMLDivElement | null>
}

export default function PostContainer({ posts, showLoader, loadMoreRef }: PostContainerInterface) {
    return(
        <div>
            {posts.map((post) => {
                return <PostCard key={post.postId} post={post} display='short' />
            })}
            <div ref={loadMoreRef} className='flex flex-row w-full justify-center h-fit'>
                {showLoader && <TubeSpinnerLoader width={40} />}
            </div>
        </div>
    )
}
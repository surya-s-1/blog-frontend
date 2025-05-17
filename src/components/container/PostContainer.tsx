import { Ref } from 'react'

import { ShortPostCard } from '@/components/post/PostCard'
import TubeSpinnerLoader from '@/components/TubeSpinnerLoader'
import { Post } from '@/components/interfaces/Post'
import WriteNew from '../post/WriteNew'

interface PostContainerInterface {
    posts: Post[]
    showLoader: boolean
    loadMoreRef: Ref<HTMLDivElement | null>
}

export default function PostContainer({ posts, showLoader, loadMoreRef }: PostContainerInterface) {
    return(
        <div>
            <WriteNew />
            {posts.map((post) => {
                return <ShortPostCard key={post.postId} post={post} />
            })}
            <div ref={loadMoreRef} className='flex flex-row w-full justify-center h-fit'>
                {showLoader && <TubeSpinnerLoader width={40} />}
            </div>
        </div>
    )
}
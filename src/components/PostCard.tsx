import { useRouter } from 'next/navigation'

import Owner from '@/components/Owner'
import { PostCardInterface } from '@/components/interfaces/Post'

export default function PostCard({ post, display }: PostCardInterface) {
    const router = useRouter()

    if (display === 'short') {
        return(
            <div
                className='w-full h-fit bg-default-bg rounded-lg p-1 m-2 cursor-pointer'
                onClick={() => { router.push(`post/${post.postId}`) }}
            >
                <Owner
                    firstName={post.firstName}
                    lastName={post.lastName}
                    dp={post.dp}
                    username={post.username}
                    display={display}
                />
                <div className='mt-1 p-2'>
                    {post.content.slice(0, 300).trim().concat('...')}
                </div>
            </div>
        )
    } else {
        return(
            <div className='w-full h-fit bg-default-bg rounded-lg p-1 m-2'>
                <Owner 
                    firstName={post.firstName}
                    lastName={post.lastName}
                    dp={post.dp}
                    username={post.username}
                    display={display}
                />
                <div className='mt-1 p-2'>
                    {post.content}
                </div>
            </div>
        )
    }
}
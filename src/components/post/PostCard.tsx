import { useRouter } from 'next/navigation'

import Metadata from '@/components/post/Metadata'
import { PostCardInterface } from '@/components/interfaces/Post'

export default function PostCard({ post, display }: PostCardInterface) {
    const router = useRouter()

    if (display === 'short') {
        const concatRequired = post.content.length > post.content.slice(0, 300).trim().length
        
        return(
            <div
                className='w-full h-fit bg-default-bg rounded-lg p-2 m-2 cursor-pointer flex flex-col gap-1'
                onClick={() => { router.push(`post/${post.postId}`) }}
            >
                <Metadata
                    firstName={post.firstName}
                    lastName={post.lastName}
                    dp={post.dp}
                    username={post.username}
                    display={display}
                    timestamp={post.createdAt}
                />
                <p className='p-2'>{post.content.slice(0, 300).trim().concat(concatRequired ? '...' : '')}</p>
            </div>
        )
    } else {
        return(
            <div className='w-full h-fit bg-default-bg rounded-lg p-1 m-2 flex flex-col gap-1'>
                <Metadata 
                    firstName={post.firstName}
                    middleName={post.middleName}
                    lastName={post.lastName}
                    dp={post.dp}
                    username={post.username}
                    display={display}
                    timestamp={post.createdAt}
                />
                <div className='p-2'>{post.content}</div>
            </div>
        )
    }
}
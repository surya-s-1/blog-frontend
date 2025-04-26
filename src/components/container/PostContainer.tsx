import Link from 'next/link'
import ProfileIcon from '../../../public/profile.svg'

import { Post } from '../interfaces/Post'
import { useRouter } from 'next/navigation'

interface PostContainerInterface {
    posts: Post[]
}

export default function PostContainer({ posts }: PostContainerInterface) {
    const router = useRouter()

    return(
        <div>
            {posts.map((post) => {
                return(
                    <div 
                        key={post.postId} 
                        className='w-full h-fit bg-white rounded-lg p-1 m-2 cursor-pointer'
                        onClick={() => { router.push(`post/${post.postId}`) }}
                    >
                        <Link 
                            className='flex flex-row justify-start w-fit gap-2 p-2' 
                            href={`user/${post.username}`}
                            onClick={e => e.stopPropagation()}
                        >
                            {!post.dp && <img src={ProfileIcon.src} width={20} alt='Profile' className='rounded-full' />}
                            <span className='text-sm'><strong>{post.firstName} {post.lastName}</strong></span>
                        </Link>

                        <div className='mt-1 p-2'>
                            {post.content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
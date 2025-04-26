import { useRouter } from 'next/router'
import Link from 'next/link'

import Metadata from '@/components/post/Metadata'
import { PostCardInterface, TagsInterface } from '@/components/interfaces/Post'

function Tags({ tags, display }: TagsInterface) {
    if (tags.length === 0) return null

    const short = display === 'short'

    return (
        <div className='relative max-w-full overflow-hidden'>
            <div className={`flex flex-row gap-1 px-1 ${short ? 'whitespace-nowrap' : 'flex-wrap'}`}>
                {tags.map((tag) => (
                    <Link
                        key={tag}
                        className='text-xs bg-secondary-bg text-secondary-fg rounded-sm p-1 px-2'
                        href={`/search?tag=${encodeURIComponent(tag)}`}
                        onClick={e => e.stopPropagation()}
                    >
                        {tag}
                    </Link>
                ))}
            </div>

            {/* Gradient fade effect */}
            <div className='pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-default-bg to-transparent' />
        </div>
    )
}


export default function PostCard({ post, display }: PostCardInterface) {
    const router = useRouter()

    if (display === 'short') {
        const concatRequired = post.content.length > post.content.slice(0, 300).trim().length

        return (
            <div
                className='w-full h-fit bg-default-bg rounded-lg p-2 m-2 cursor-pointer flex flex-col gap-1'
                onClick={() => { router.push(`/post/${post.postId}`) }}
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
                <Tags tags={post.tags} display={display} />
            </div>
        )
    } else {
        return (
            <div className='w-full h-fit bg-default-bg rounded-lg p-4 pb-6 m-2 flex flex-col gap-1'>
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
                <Tags tags={post.tags} display={display} />
            </div>
        )
    }
}
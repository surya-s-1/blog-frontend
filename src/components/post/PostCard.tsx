import Link from 'next/link'

import { useDispatch } from 'react-redux'
import { setPostModal } from '@/store/slices/appSlice'

import Metadata from '@/components/post/Metadata'
import { PostCardInterface, TagsInterface } from '@/components/interfaces/Post'

import { FaRegComment, FaShare } from 'react-icons/fa'

function Tags({ tags, display }: TagsInterface) {
    if (tags.length === 0) return null

    const short = display === 'short'

    return (
        <div className='relative max-w-full overflow-hidden'>
            <div className={`flex flex-row gap-1 px-1 ${short ? 'whitespace-nowrap' : 'flex-wrap'}`}>
                {tags.map((tag, idx) => (
                    <Link
                        key={`${tag}-${idx}`}
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


export function ShortPostCard({ post }: PostCardInterface) {
    const dispath = useDispatch()
    const concatRequired = post.content.length > post.content.slice(0, 300).trim().length

    return (
        <div
            className='w-full h-fit bg-default-bg rounded-lg p-2 m-2 flex flex-col gap-1 cursor-pointer'
            onClick={() => { 
                console.log('dispatching...', post.postId)
                dispath(setPostModal(post.postId)) 
            }}
        >
            <Metadata
                firstName={post.firstName}
                lastName={post.lastName}
                dp={post.dp}
                username={post.username}
                display='short'
                timestamp={post.createdAt}
            />
            <p className='p-2'>{post.content.slice(0, 300).trim().concat(concatRequired ? '...' : '')}</p>
            <Tags tags={post.tags} display='short' />
            <div className='w-full flex flex-row items-center justify-evenly'>
                <button className='button-dull'><FaRegComment size={16} /> Comment</button>
                <button className='button-dull'><FaShare size={16} /> Share</button>
            </div>
        </div>
    )
}

export function ExpandedPostCard({ post }: PostCardInterface) {
    return (
        <div className='w-full h-fit bg-default-bg rounded-lg p-4 pb-6 m-0 flex flex-col gap-1'>
            <div className='w-full flex flex-row items-center justify-between'>
                <Metadata
                    firstName={post.firstName}
                    middleName={post.middleName}
                    lastName={post.lastName}
                    dp={post.dp}
                    username={post.username}
                    display='long'
                    timestamp={post.createdAt}
                />
                <button className='button-dull text-lg'><FaShare size={20} /> Share</button>
            </div>
            <pre className='p-2 text-wrap font-sans'>{post.content}</pre>
            <Tags tags={post.tags} display='long' />
        </div>
    )
}
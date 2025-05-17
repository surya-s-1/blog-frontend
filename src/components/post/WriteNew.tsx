import { useEffect, useState } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useRouter } from 'next/router'

import ProfileIcon from '@/../public/profile.svg'

import AutoExpandingTextarea from '@/components/post/AutoExpandTextarea'
import TagInput from '@/components/post/TagsInput'
import PostVisibilityDropdown from '@/components/post/PostVisibilityDropdown'
import TubeSpinnerLoader from '../TubeSpinnerLoader'

export default function WriteNew() {
    const router = useRouter()

    const [visible, setVisible] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [tags, setTags] = useState<Array<string>>([])
    const [postPublic, setPostPublic] = useState<boolean>(true)

    const { createPost, createPostResult } = usePosts()
    const { data, error, loading } = createPostResult

    async function onSubmit() {
        if (!loading) {
            createPost(content, tags, postPublic)
        }
    }

    if (data?.createPost) {
        router.push(`/post/${data.createPost.postId}`)
    }

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='w-full h-fit bg-default-bg rounded-lg p-4 m-2'>
                <div 
                    className='flex flex-row items-center justify-start gap-4 cursor-pointer mb-2'
                    onClick={() => setVisible(!visible)}
                >
                    <div>
                        <img src={ProfileIcon.src} width={36} alt='Profile' className='rounded-full' />
                    </div>
                    <div>What's on your mind..?</div>
                </div>
                {visible && (
                <>
                    <AutoExpandingTextarea text={content} placeholder='Write your thoughts here...' setText={setContent} />
                    <TagInput initialTags={tags} onTagsChange={setTags} />
                    <PostVisibilityDropdown postPublic={postPublic} setPostPublic={setPostPublic} />
                    <button 
                        className='flex gap-2 cursor-pointer p-2 bg-primary-bg text-primary-fg mt-2 rounded-md'
                        onClick={() => onSubmit()}
                    >
                        Submit {loading && <TubeSpinnerLoader width={20} />}
                    </button>
                    {error && <span className='text-danger-fg'>Unable to create post</span>}
                </>
                )}
        </div>
    )
}
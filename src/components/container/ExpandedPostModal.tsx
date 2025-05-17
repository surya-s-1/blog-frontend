import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { setPostModal } from '@/store/slices/appSlice'

import { usePosts } from '@/hooks/usePosts'

import { ExpandedPostCard } from '@/components/post/PostCard'
import TubeSpinnerLoader from '../TubeSpinnerLoader'

export default function ExpandedPostModal() {
    const modal = useSelector((state: RootState) => state.app.modal)
    const dispatch = useDispatch()

    const { getSinglePost, singlePostResult } = usePosts()
    const { data, loading, error } = singlePostResult

    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (modal.postId) {
            setVisible(true)
            getSinglePost(modal.postId)
        } else {
            setVisible(false)
        }
    }, [modal.postId])

    function handleModalClose() {
        dispatch(setPostModal(null))
    }

    if (error) {
        console.error(error)
    }

    return (
        ((data || loading) && visible) ?
        
        (
            <div
                onClick={() => { handleModalClose() }}
                className={`fixed z-10 inset-0 w-screen h-screen bg-black/50 flex items-center justify-center`}
            >
                <div
                    onClick={e => e.stopPropagation()}
                    className={`w-[60vw] h-fit max-h-[60vh] rounded-md overflow-y-auto scrollbar-hide`}
                >
                    { loading ? <TubeSpinnerLoader width={20} /> : <ExpandedPostCard post={data.getPost} />}
                </div>
            </div>
        ) 
        
        : null
    )
}
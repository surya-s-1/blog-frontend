import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_POST, GET_POST } from '@/gql/queries'

export function usePosts() {
    const [getSinglePostQuery, singlePostResult] = useLazyQuery(GET_POST)
    const [createPostMutation, createPostResult] = useMutation(CREATE_POST)

    function getSinglePost(postId: string) {
        return getSinglePostQuery({ variables: { postId } })
    }

    function createPost(content: string, tags: string[], visible: boolean) {
        return createPostMutation({ variables: { content, tags, public: visible }})
    }

    return {
        getSinglePost,
        singlePostResult,
        createPost,
        createPostResult
    }
}
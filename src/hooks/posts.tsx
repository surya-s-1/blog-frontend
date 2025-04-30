import { useLazyQuery } from '@apollo/client'
import { GET_POST } from '@/gql/queries'

export function usePosts() {
    const [getSinglePostQuery, singlePostResult] = useLazyQuery(GET_POST)

    function getSinglePost(postId: string) {
        return getSinglePostQuery({ variables: { postId } })
    }

    return {
        getSinglePost,
        singlePostResult
    }
}
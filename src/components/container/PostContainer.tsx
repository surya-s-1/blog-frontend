import { Post } from '../interfaces/Post'

interface PostContainerInterface {
    posts: Post[]
    loading: boolean
}

export default function PostContainer({ posts, loading }: PostContainerInterface) {
    return(
        <div>
            {posts.map((post) => {
                return(
                    <div>{post.content}</div>
                )
            })}
            <div>
                {loading && 'Loading...'}
            </div>
        </div>
    )
}
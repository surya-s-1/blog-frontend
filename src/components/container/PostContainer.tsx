import { Post } from '../interfaces/Post'

interface PostContainerInterface {
    posts: Post[]
}

export default function PostContainer({ posts }: PostContainerInterface) {
    return(
        <div>
            {posts.map((post) => {
                return(
                    <div style={{ height: '50vh'}}>
                        {post.content}
                    </div>
                )
            })}
        </div>
    )
}
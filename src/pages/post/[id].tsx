import { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from 'next'

import TubeSpinnerLoader from '@/components/TubeSpinnerLoader'
import PostCard from '@/components/post/PostCard'
import { Post } from '@/components/interfaces/Post'
import { GET_POST } from '@/gql/queries'
import { ssrApolloClient } from '../../../apollo-client'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const postId = context.params?.id

        console.log('PostId:', postId)

        const { data, error } = await ssrApolloClient.query({
            query: GET_POST,
            variables: { postId }
        })

        if (error) {
            console.error(error)
            throw new Error(error?.message)
        }

        return {
            props: {
                post: data.getPost as Post,
                error: null
            }
        }
    } catch (err) {
        console.error(err)

        return {
            props: {
                post: null,
                error: 'Failed to fetch post'
            }
        }
    }
}

export default function PostDetail({ post, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (post) {
        return(
            <div className='w-[70%] ml-[15%]'>
                <PostCard post={post} display='long' />
            </div>
        )
    } else {
        return(
            <div className='text-danger-fg'>
                {error}
            </div>
        )
    }
}
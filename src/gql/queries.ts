import { gql } from '@apollo/client'

export const GET_HOME_FEED = gql`
    query GetHomeFeed($limit: Int!, $cursor: DateTime) {
        getHomeFeed(limit: $limit, cursor: $cursor) {
            posts {
                postId
                content
                tags
                createdAt
                public
                username
                firstName
                middleName
                lastName
                dp
            }
            nextCursor
        }
    }
`

export const GET_POST = gql`
    query GetPost($postId: String!) {
        getPost(postId: $postId) {
            postId
            content
            tags
            createdAt
            public
            username
            firstName
            middleName
            lastName
            dp
        }
    }
`
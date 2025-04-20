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
                userId
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
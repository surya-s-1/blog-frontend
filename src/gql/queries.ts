import { gql } from '@apollo/client'

export const GET_HOME_FEED = gql`
    query GetHomeFeed($limit: Int, $cursor: String) {
        getHomeFeed(limit: $limi, cursor: $cursor) {
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
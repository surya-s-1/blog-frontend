export interface Post {
    postId: string,
    content: string,
    tags: Array<string>,
    createdAt: string,
    public: boolean,
    userId: string | null,
    username: string | null,
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    dp: string | null,
    __typename?: string | null
}

export interface PostCardInterface {
    post: Post
    display: 'short' | 'long'
}

export interface MetadataInterface {
    dp: string | null
    username: string | null
    firstName: string | null
    middleName?: string | null
    lastName: string | null
    timestamp: string | Date | number
    publicVisible?: boolean
    display: 'short' | 'long'
}

export interface TagsInterface {
    tags: string[]
    display: 'short' | 'long'
}
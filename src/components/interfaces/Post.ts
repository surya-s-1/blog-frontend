export interface Post {
    postId: string,
    content: string,
    tags: Array<string>,
    createdAt: string,
    public: boolean,
    username: string | null,
    firstName: string | null,
    middleName: string | null,
    lastName: string | null,
    dp: string | null,
    __typename?: string | null
}

export interface PostCardInterface {
    post: Post
}

export interface ShortPostCardInterface extends PostCardInterface {
    onClick: (e: string) => void
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
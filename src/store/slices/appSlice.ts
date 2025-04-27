import { createSlice } from '@reduxjs/toolkit'
import { Post } from '@/components/interfaces/Post'

type ThemeType = 'light' | 'dark'

interface AppState {
  theme: ThemeType;
  homeFeed: {
    posts: Post[],
    nextCursor: string | Date | null
  }
}

const initialState: AppState = {
  theme: 'light',
  homeFeed: {
    posts: [],
    nextCursor: null
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    appendHomeFeed: (state, payload) => {
      state.homeFeed.posts = [ ...state.homeFeed.posts, ...payload.payload.posts ]
      state.homeFeed.nextCursor = payload.payload.nextCursor
    },
    replaceHomeFeed: (state, payload) => {
      state.homeFeed.posts = [ ...payload.payload.posts ]
      state.homeFeed.nextCursor = payload.payload.nextCursor
    },
    clearHomeFeed: (state) => {
      state.homeFeed.posts = []
      state.homeFeed.nextCursor = null
    }
  }
})

export const { 
  toggleTheme,
  appendHomeFeed,
  replaceHomeFeed,
  clearHomeFeed
} = appSlice.actions

export default appSlice.reducer
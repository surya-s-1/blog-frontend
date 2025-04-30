import { createSlice } from '@reduxjs/toolkit'

type ThemeType = 'light' | 'dark'

interface AppState {
  theme: ThemeType,
  modal: {
    postId: string | null
  }
}

const initialState: AppState = {
  theme: 'light',
  modal: {
    postId: null
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setPostModal: (state, action) => {
      state.modal.postId = action.payload
    }
  }
})

export const { 
  toggleTheme,
  setPostModal
} = appSlice.actions

export default appSlice.reducer
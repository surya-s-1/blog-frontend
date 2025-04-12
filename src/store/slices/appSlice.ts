import { createSlice } from '@reduxjs/toolkit'

type ThemeType = 'light' | 'dark'

interface AppState {
  theme: ThemeType;
}

const initialState: AppState = {
  theme: 'light',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    }
  }
})

export const { 
  toggleTheme 
} = appSlice.actions

export default appSlice.reducer
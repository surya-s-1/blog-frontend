import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'counter',
  initialState: { 
    theme: 'light' 
  },
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
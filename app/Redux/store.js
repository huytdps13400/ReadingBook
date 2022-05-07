import { configureStore } from '@reduxjs/toolkit'
import reduxReducer from './reduxSlice'

export const store = configureStore({
  reducer: {
      books: reduxReducer
  },
})
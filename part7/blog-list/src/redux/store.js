import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationSlice'
import blogsReducer from './blogsSlice'

export const store = configureStore({
  reducer: {
       notification: notificationReducer,
       blogs: blogsReducer 
    },
})
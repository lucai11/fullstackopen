import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationSlice'
import blogsReducer from './blogsSlice'
import usersReducer from './usersSlice'

export const store = configureStore({
  reducer: {
       notification: notificationReducer,
       blogs: blogsReducer,
       users: usersReducer
    },
})
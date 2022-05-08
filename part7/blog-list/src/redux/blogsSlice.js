import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs";
const initialState = {
    blogs: []
}

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.blogs = action.payload
        },
        likeBlog: (state, action) => {
            const id = action.payload
            const newBlog = state.blogs.find(blog => blog.id === id)
            newBlog.likes++
            blogService.updateBlog(newBlog)
        },
        deleteBlog: (state, action) => {
            const id = action.payload
            blogService.deleteBlog(id)
            state.blogs = state.blogs.filter(blogs => blogs.id !== id)
        }
    }
})

export const { setAll, likeBlog, deleteBlog } = blogsSlice.actions

export default blogsSlice.reducer
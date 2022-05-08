import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs";
const initialState = {
    blogs: [],
    blog: null
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
        },
        currentBlog: (state, action) => {
            const id = action.payload
            const currentBlog = state.blogs.find(blog => blog.id === id)
            state.blog = currentBlog
        }
    }
})

export const { setAll, likeBlog, deleteBlog, currentBlog } = blogsSlice.actions

export default blogsSlice.reducer
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ initialBlog, resetBlog, user }) => {

    const [visible, setVisible] = useState(false)
    const [blog, setBlog] = useState(initialBlog)
    const username = user === null ? '' : user.username
    const addLike = async () => {
        let newBlog = blog
        newBlog.likes++
        await blogService.updateBlog(newBlog)
        const updatedBlog = await blogService.getBlog(newBlog.id)
        setBlog(updatedBlog)
    }

    const deleteBlog = async (id) => {
        if (window.confirm(`Delete ${blog.title}?`)) {
            await blogService.deleteBlog(id)
            const blogs = await blogService.getAll()
            resetBlog(blogs)
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className = 'blog' style = {blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button style={{ marginLeft: '10px' }} onClick={() => setVisible(!visible)}>view</button>
                <div className = 'fullBlog' style = { visible ? { display: 'block' } : { display: 'none' }}>
                    {blog.url}<br />
                    <div className='likes'>
                        <span data-cy = "num-likes">{blog.likes}</span><button style={{ marginLeft: '10px' }} onClick={() => addLike()}>like</button>
                    </div><br />
                    {blog.user.username === username ? <button style={{ marginLeft: '10px' }} onClick={() => deleteBlog(blog.id)}>remove</button> : '' }
                </div>
            </div>
        </div>
    )
}

export default Blog
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const userJSON = window.localStorage.getItem('blogLoginInfo')
        if (userJSON) {
            const user = JSON.parse(userJSON)
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    useEffect(() => {
        setTimeout( () => { setNotification(null) }, 5000)
    }, [notification])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'blogLoginInfo', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (err) {
            setNotification(err.response.data.error)
        }
    }

    const logoutFn = () => {
        setUser(null)
        window.localStorage.removeItem('blogLoginInfo')
    }

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
        <div>
            <h2>blogs</h2>
            { notification !== null && <Notification message={notification}/> }
            <div style = {hideWhenVisible} >
                <button onClick={ () => setLoginVisible(true) } >Login</button>
            </div>
            <div style = {showWhenVisible} >
                {user === null
                    ? <LoginForm
                        username = {username}
                        password = {password}
                        setUsername = {setUsername}
                        setPassword = {setPassword}
                        handleLogin = {handleLogin}
                    />
                    : <div><p>{user.name}</p><button onClick={ () => logoutFn() }>Logout</button></div> }
                <button onClick = { () => { setLoginVisible(false) }} >Cancel</button>
            </div>
            {user !== null &&
        <Togglable buttonLabel="New Blog" ref={ blogFormRef }>
            <BlogForm setBlogs = {setBlogs} setNotification={setNotification} toggleVisibility = { () => blogFormRef.current.toggleVisibility() } createBlog = { blogService.createBlog }/>
        </Togglable>
            }
            <div id='blogsContainer'>
                {
                    blogs
                        .map(blog => <Blog key = {blog.id} initialBlog = {blog} resetBlog = {setBlogs} user = {user} />)
                        .sort((a, b) => b.props.initialBlog.likes - a.props.initialBlog.likes)
                }
            </div>
        </div>
    )
}

export default App
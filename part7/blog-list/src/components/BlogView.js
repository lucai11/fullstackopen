import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'

const BlogView = () => {
    const [blog, setBlog] = useState("")
    const [id, setId] = useState(useParams().id)

    useEffect(() => {
        console.log(id)
        const fetchBlog = async () => {
            const returnedBlog = await blogService.getBlog(id)
            return returnedBlog
        }
        if(id !== null){
            fetchBlog().then((data) => {
                setBlog(data)
            }) 
        }
        return () => {
            setBlog("")
            setId(null)
        }
    }, [id])
    // if(!blog){
    //     return null
    // }
    // console.log(blog)
    return(
        <div>
            <p>{blog.title}</p>
            <p>{blog.name}</p>
            <p>{blog.likes}</p>
            <p>{blog.url}</p> 
        </div>
    )
}

export default BlogView
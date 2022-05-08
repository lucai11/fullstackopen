import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.currentUser)
    const blogs = useSelector((state) => state.blogs.blogs)
    const userBlogs = blogs.filter(blog => blog.user.username === user.username);

    return(
        <div>
            {user ? user.name : ''}
            <ul>
                {userBlogs.map(blog => 
                    (<li key={blog.id}>{blog.title}</li>)
                )}

            </ul>
        </div>
    )

}

export default Profile
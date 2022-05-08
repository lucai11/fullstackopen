import React, { useState } from "react";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from 'react-redux'
import { setAll } from '../redux/blogsSlice'

const BlogForm = ({
    setNotification,
    toggleVisibility,
    createBlog,
    }) => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const newBlog = async (event) => {
      event.preventDefault();

      const newBlog = await createBlog({ title, url });
      toggleVisibility();
      setNotification(
        `New Blog Created: Title ${newBlog.title}, Author: ${newBlog.author}`
      );
      setUrl("");
      setTitle("");
      const blogs = await blogService.getAll();
      dispatch(setAll(blogs));
  };

  return (
    <div>
      <h3>Create New Blog Post</h3>
      <form onSubmit={newBlog}>
        <div>
          <label>title: </label>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>url: </label>
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-blog" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

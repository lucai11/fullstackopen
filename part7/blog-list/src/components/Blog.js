import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, resetBlog, user }) => {
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(1);
  const username = user === null ? "" : user.username;

  const addLike = async () => {
    let newBlog = blog;
    newBlog.likes++;
    await blogService.updateBlog(newBlog);
    setUpdate(update + 1);
  };

  const deleteBlog = async (id) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      await blogService.deleteBlog(id);
      const blogs = await blogService.getAll();
      resetBlog(blogs);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => setVisible(!visible)}
        >
          view
        </button>
        <div
          className="fullBlog"
          style={visible ? { display: "block" } : { display: "none" }}
        >
          {blog.url}
          <br />
          <div className="likes">
            <span data-cy="num-likes">{blog.likes}</span>
            <button style={{ marginLeft: "10px" }} onClick={() => addLike()}>
              like
            </button>
          </div>
          <br />
          {blog.user.username === username ? (
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteBlog(blog.id)}
            >
              remove
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;

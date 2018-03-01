import React from "react";
const Blog = ({ blog, user, likeButtonHandler, handleBlogDelete }) => (
  <div>
    <div onClick={blog.toggleVisibility}>{blog.title}</div>
    <div>{blog.author}</div>
    <a href={blog.url}>{blog.url}</a>
    <div>
      {blog.likes} likes{" "}
      <button onClick={() => likeButtonHandler(blog)}>Like</button>
    </div>

    {blog.user !== undefined ? (
      <div>Added by {blog.user.name}</div>
    ) : (
      <div>Added by unknown</div>
    )}

    {(blog.user === undefined ||
      blog.user.username.toString() === user.username.toString()) && (
      <button onClick={() => handleBlogDelete(blog)}>Delete blog</button>
    )}
  </div>
);

export default Blog;

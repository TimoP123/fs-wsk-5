import React from "react";

const BlogForm = ({
  handleSubmit,
  handleFieldChange,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="newBlogTitle"
          value={newBlogTitle}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          name="newBlogAuthor"
          value={newBlogAuthor}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <label>Url</label>
        <input
          type="text"
          name="newBlogUrl"
          value={newBlogUrl}
          onChange={handleFieldChange}
        />
      </div>
      <button type="submit">Submit blog</button>
    </form>
  );
};

export default BlogForm;

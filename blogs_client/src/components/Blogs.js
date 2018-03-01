import React from "react";
import Blog from "./Blog";
import BlogWrapper from "./BlogWrapper";

class Blogs extends React.Component {
  render() {
    const { blogs, user, likeButtonHandler, handleBlogDelete } = this.props;
    const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes);

    return (
      <div>
        {orderedBlogs.map(blog => (
          <BlogWrapper
            key={blog._id}
            buttonLabel={`${blog.title} - ${blog.author}`}
          >
            <Blog
              blog={blog}
              user={user}
              likeButtonHandler={likeButtonHandler}
              handleBlogDelete={handleBlogDelete}
            />
          </BlogWrapper>
        ))}
      </div>
    );
  }
}

export default Blogs;

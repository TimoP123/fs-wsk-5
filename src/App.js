import React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      user: null,
      username: "",
      password: "",
      message: null,
      error: null,
      newBlogTitle: "",
      newBlogAuthor: "",
      newBlogUrl: ""
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }));

    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      this.setState({ username: "", password: "", user });
    } catch (exception) {
      this.setState({
        error: "Username or password is not valid"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    this.setState({ user: null });
  };

  handleSubmitBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogUrl
      });

      if (newBlog) {
        this.setState({ newBlogTitle: "", newBlogAuthor: "", newBlogUrl: "" });
        newBlog.user = this.state.user;
        this.setState({ blogs: this.state.blogs.concat(newBlog) });
        this.setState({
          message: "New blog created succesfully!"
        });
        setTimeout(() => {
          this.setState({ message: null });
        }, 5000);
      }
    } catch (exception) {}
  };

  handleBlogLike = async blog => {
    blog.likes++;
    const blogToSend = {
      _id: blog._id,
      user: blog.user,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };
    await blogService.update(blogToSend);
    this.setState({ blogs: this.state.blogs }); // to get the component re-rendered
  };

  handleBlogDelete = async blog => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      await blogService.remove(blog);
      const newBlogList = this.state.blogs.filter(x => x._id !== blog._id);
      this.setState({ blogs: newBlogList });
      this.setState({
        message: `${blog.title} is now deleted.`
      });
      setTimeout(() => {
        this.setState({ message: null });
      }, 5000);
    }
  };

  render() {
    return (
      <Wrapper>
        <Header />
        <Notification error={this.state.error} message={this.state.message} />

        {this.state.user === null && (
          <LoginForm
            handleLogin={this.handleLogin}
            handleFieldChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        )}

        {this.state.user !== null && (
          <div>
            <p>
              {this.state.user.name} logged in{" "}
              <button type="submit" onClick={this.handleLogout}>
                Logout
              </button>
            </p>

            <Blogs
              blogs={this.state.blogs}
              user={this.state.user}
              likeButtonHandler={this.handleBlogLike}
              handleBlogDelete={this.handleBlogDelete}
            />

            <Togglable buttonLabel={"Create new blog"}>
              <BlogForm
                handleSubmit={this.handleSubmitBlog}
                handleFieldChange={this.handleFieldChange}
                newBlogTitle={this.state.newBlogTitle}
                newBlogAuthor={this.state.newBlogAuthor}
                newBlogUrl={this.state.newBlogUrl}
              />
            </Togglable>
          </div>
        )}
      </Wrapper>
    );
  }
}

export default App;

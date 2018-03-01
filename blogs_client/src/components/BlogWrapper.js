import React from "react";

class BlogWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { buttonLabel } = this.props;

    let children = this.props.children;
    children.props.blog.toggleVisibility = this.toggleVisibility;

    const hideWhenVisible = { display: this.state.visible ? "none" : "" };
    const showWhenVisible = { display: this.state.visible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <div className={"blogClosed"} onClick={this.toggleVisibility}>
            {buttonLabel}
          </div>
        </div>
        <div className={"blogOpen"} style={showWhenVisible}>
          {children}
        </div>
      </div>
    );
  }
}

export default BlogWrapper;

import React from "react";
import PropTypes from "prop-types";

class Togglable extends React.Component {
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
    const { buttonLabel, showButtonClass, hideButtonClass } = this.props;

    const hideWhenVisible = { display: this.state.visible ? "none" : "" };
    const showWhenVisible = { display: this.state.visible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button className={showButtonClass} onClick={this.toggleVisibility}>
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button className={hideButtonClass} onClick={this.toggleVisibility}>
            Hide
          </button>
        </div>
      </div>
    );
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  showButtonClass: PropTypes.string,
  hideButtonClass: PropTypes.string
};

export default Togglable;

import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin, handleFieldChange, username, password }) => (
  <div>
    <h2>Log in to the application</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleFieldChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleFieldChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;

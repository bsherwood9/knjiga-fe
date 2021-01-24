import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [logData, setLogData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2700/api/auth/login", logData, {
        withCredentials: true,
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={logData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={logData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

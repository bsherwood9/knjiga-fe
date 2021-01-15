import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    cpassword: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setError(false);
    e.preventDefault();
    console.log(formData);
    if (formData.password !== formData.cpassword) {
      setError("Passwords aren't matching.");
    } else if (formData.password.length < 8) {
      setError("Password needs to be at least 8 characters.");
    } else {
      let { email, password } = formData;
      axios
        .post("localhost:5600/api/auth/register", { email, password })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {error && <h1>{error}</h1>}
        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          s<label htmlFor="cpassword">Confirm Password</label>
          <input
            name="cpassword"
            type="password"
            value={formData.cpassword}
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
export default Register;

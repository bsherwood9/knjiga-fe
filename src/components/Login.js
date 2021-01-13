import React, {useState} from "react";

function Register() {
    const [formData, setFormData] = useState({username:"", password:"", email=""})
  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            value={formData.username}
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
        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            name="cpassword"
            type="password"
            value={formData.password2}
            onChange={handleChange}
          />
        </label>
        {error ? <p className="error-text">{error}</p> : null}
        <button>Submit</button>
      </form>
    </div>
  );
}

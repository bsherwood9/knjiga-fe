import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password should be at least 8 characters"),
});
function Login() {
  return (
    <div className="login-form">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          axios
            .post("http://localhost:4001/api/auth/login", values, {
              withCredentials: true,
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
        validationSchema={loginSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="jane@email.com"
              // onChange={handleChange}
            />
            {touched.email && errors.email ? <p>{errors.email}</p> : null}

            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              placeholder="password"
              // value={logData.password}
              // onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <p>{errors.password}</p>
            ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;

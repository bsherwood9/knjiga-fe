import React from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 characters")
    .required("Required"),
  cpassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  email: Yup.string().email("Invalid email").required("Required"),
});

function Register() {
  const handleSubmit = (values) => {
    let { email, password, name } = values;

    axios
      .post("http://localhost:4001/api/auth/register", {
        email,
        password,
        name,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="auth-form">
      <h2>Register</h2>
      <Formik
        initialValues={{
          password: "",
          email: "",
          cpassword: "",
          name: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={registerSchema}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor="name">FullName</label>
            <Field name="name" type="text" />
            {touched.name && errors.name ? <p>{errors.name}</p> : null}
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" placeholder="jane@email.com" />
            {touched.email && errors.email ? <p>{errors.email}</p> : null}
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              // value={formData.password}
              // onChange={handleChange}
            />
            {touched.password && errors.password ? (
              <p>{errors.password}</p>
            ) : null}
            s<label htmlFor="cpassword">Confirm Password</label>
            <Field
              name="cpassword"
              type="password"
              // value={formData.cpassword}
              // onChange={handleChange}
            />
            {touched.cpassword && errors.cpassword ? (
              <p>{errors.cpassword}</p>
            ) : null}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default Register;

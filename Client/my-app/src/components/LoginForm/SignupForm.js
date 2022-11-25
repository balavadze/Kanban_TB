import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import classes from "./LoginForm.module.css";

import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const SignupForm = () => {
  const [error, setError] = useState(false);
  const [messageSignup, setMessageSignup] = useState();

  const signUpUser = async (input) => {
    console.log(input);
    let path = "http://localhost:8000/signup";
    try {
      let response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(input),
      });

      //   console.log(response);
      // } catch (err) {
      //   console.err(err.message);
      // }

      if (response.status === 201) {
        console.log(response);
        setMessageSignup(response.statusText);
      } else {
        let error = new Error(`${response.statusText}: ${response.url}`);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      console.log("There was an error when updating data", error);
      setError("There was an error signing up");
    }
  };
  return (
    <section className={classes.authorization}>
      <div className="Sign up form">
        <h1>Signup</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            //  Validation for strong password
            password: Yup.string()
              .password()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
          })}
          onSubmit={(values) => {
            signUpUser(values);
          }}
        >
          <Form className="d-flex flex-column m-5">
            <div className={classes.control}>
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" id="email" />
              <ErrorMessage name="email" />
            </div>

            <div className={classes.control}>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" id="password" />
              <ErrorMessage name="password" />
            </div>

            <div className={classes.actions}>
              <button type="submit">Submit</button>
            </div>
            <div className={classes.actions}>
              <Link to="/dashboard" className={classes.toggle}>
                Login with your account
              </Link>
            </div>
          </Form>
        </Formik>
        {messageSignup ? <div>{messageSignup}</div> : null}
        {error ? <div>{error}</div> : null}
      </div>
    </section>
  );
};

export default SignupForm;

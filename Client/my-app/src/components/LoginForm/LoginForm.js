import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useContext } from "react";
// import { Link, unstable_HistoryRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import classes from "./LoginForm.module.css";
import AuthContext from "../../store/AuthorizationContextProvider";
import YupPassword from "yup-password";
YupPassword(Yup); // extend yup

const LoginForm = (props) => {
  // const history = unstable_HistoryRouter();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();

  const authCtx = useContext(AuthContext);

  const loginUser = async (input) => {
    console.log(input);
    let path = "http://localhost:8000/dashboard";
    try {
      let response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response.status === 200) {
        console.log(response);
        let data = await response.json();
        let token = data.token;
        console.log(data);
        // save to localStorage
        localStorage.setItem("token", JSON.stringify(token));
        setMessage("You are logged in!");
        //! change state of loggedIn ***** is this the correct way of writing it?
        // props.isAuth(true);
        // .then ((data) =>{
        //   authCtx.login(data.token)});
        // set token to reflect authentication state on the UI
        authCtx.login(token);
        // history.replace("/dashboard");
      } else {
        let error = new Error(`${response.statusText}: ${response.url}`);
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      console.log("There was an error when logging in user", error);
      setError({ message: "There was an error when logging in" });
    }
  };
  return (
    <section className={classes.authorization}>
      <div className="Login form">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            //  Validation for strong password
            password: Yup.string()
              .password()
              .max(72, "Must be 15 characters or less")
              .required("Required"),
          })}
          onSubmit={(values) => {
            console.log("in on submit", values);
            loginUser(values);
          }}
        >
          <Form className="d-flex flex-column m-5">
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" id="email" />
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
              <Link to="/signup" className={classes.toggle}>
                Signup for a new account
              </Link>
            </div>
          </Form>
        </Formik>
        {message ? <div>{message}</div> : null}
        {error ? <div>{error.message}</div> : null}
      </div>
    </section>
  );
};

export default LoginForm;

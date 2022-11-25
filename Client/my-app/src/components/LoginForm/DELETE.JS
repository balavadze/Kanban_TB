import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/AuthorizationContextProvider";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const emailField = useRef();
  const pwdField = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  //! Do we really need?
  const [inProgress, setInProgress] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailField.current.value;
    const enteredPassword = pwdField.current.value;

    //! Add validation

    setInProgress(true);

    let url;

    //!! Hide Key in ENV

    if (isLogin) {
      url = "http://localhost:8000/login";
    } else {
      url = "http://localhost:8000/signup";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setInProgress(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            //!! Add Errors - Add Codes?
            // console.log(data);
            let errorMessage = "Authentication failed";

            //generates pop up with errors //firebase automatically declined weak passwords
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.authorization}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailField} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={pwdField} />
        </div>
        <div className={classes.actions}>
          {!inProgress && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {!inProgress && <p>Processing</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

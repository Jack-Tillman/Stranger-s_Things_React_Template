import React, { useState } from "react";
import "./Register.css";
import { registerUser } from "./api";
/*
Register utilizes useState to track both user input and errors with user input.
Validation of user inputs occurs upon submission, either when user presses enter within input fields or clicks Register button
handleUserInput will pass a copy of formInput object as an argument for setFormInput.
That copied object contains 3 properties total, each for username, password, and confirmPassword respectively
Upon submission, the user's inputs (held by formInput) are checked for errors within username, password, and confirmPassword fields
If there are any errors within the user's inputs, then the submission does not go through, and a span with an appropriate error message is rendered
*/

const Register = ({
  isLoggedIn,
  setIsLoggedIn,
  userAccount,
  setUserAccount,
}) => {
  //track whether registration was successful or not
  const [registerSuccess, setRegisterSuccess] = useState(false);

  //tracks user input and places username, password, and confirmPassword values in an object
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  //tracks errors associated with user input for username, password, and confirmPassword
  const [formError, setFormError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      //spread operator to make a copy of formInput object
      ...formInput,
      //[username] / [password]: (user's input for username / password)
      [name]: value,
    });
  };

  function populateStorage(authToken) {
    localStorage.setItem("username", formInput.username);
    localStorage.setItem("id", authToken);
  }
  //used by both validateFormInput, and to conditionally render prompts for sign in
  const userCheck = /^[a-zA-Z0-9]+$/;
  const userResult = userCheck.test(formInput.username);

  const validateFormInput = (e) => {
    //prevent page reload
    e.preventDefault();
    let inputError = {
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!userResult) {
      setFormError({
        ...inputError,
        username: "Username may contain only letters and numbers.",
      });
      return;
    }

    //if invalid username & password, pass a copy of inputError object and display error message for both username & password to setFormError
    if (!formInput.username && !formInput.password) {
      setFormError({
        ...inputError,
        username: "Please enter a valid username.",
        password: "Please enter a valid password.",
      });
      return;
    }
    //if invalid username, pass copy of inputError object and display error message for username to setFormError
    if (!formInput.username) {
      setFormError({
        ...inputError,
        username: "Please enter a valid username",
      });
      return;
    }
    //if password doesn't match password confirmation input, pass copy of inputError and display error message for confirmPassword to setFormError
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword:
          "The entries for password and password confirmation must be the same.",
      });
      return;
    }
    //if no password entered, display error message and pass the error to setFormError
    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password cannot be empty.",
      });
      return;
    }
    //if the user's input passes all the validation checks, then initiate a fetch request for the authentification token

    if (
      userResult &&
      formInput.username &&
      formInput.password &&
      formInput.confirmPassword === formInput.password
    ) {
      async function fetchToken() {
        try {
          //get authorization token
          const authToken = await registerUser(
            formInput.username,
            formInput.password
          );
          //add isAuthenticated and _id to hold authToken
          if (authToken) {
            await setUserAccount({
              username: formInput.username,
              password: formInput.password,
              isAuthenticated: true,
              _id: authToken,
            });
            //put authToken in localStorage
            await populateStorage(authToken);
            await setIsLoggedIn(true);
            await setRegisterSuccess(true);
          } else {
            setRegisterSuccess(false);
            alert("Please use a different username, that user already exists!");
          }
        } catch (error) {
          throw error;
        }
      }
      fetchToken();
    }
    //pass whatever inputError exists to setFormError to update state and display the error messages on the screen
    setFormError(inputError);
  };

  return (
    <>
      <main className="register-main">
        <div className="register-container">
          <h3 className="h3-register">Register</h3>
          <form className="register-form" onSubmit={validateFormInput}>
            <label className="all-labels username-label" htmlFor="username">
              Username
              {/* line below ensures the prompt disappears once user enters 8 characters */}
              {formInput.username.length < 8 && (
                <span className="register-setup">
                  {" "}
                  • Usernames must be 8 - 20 characters in length, using only
                  use letters and numbers.
                </span>
              )}
              {!userResult && (
                <span className="register-setup">
                  {" "}
                  • Username cannot have special characters
                </span>
              )}
              <input
                className="register-input"
                type="text"
                placeholder="Enter a valid username"
                name="username"
                minLength="8"
                maxLength="20"
                value={formInput.username}
                onChange={(e) => {
                  handleUserInput(e.target.name, e.target.value);
                }}
              />
              {/*Span with error message will render ONLY if there is an error with the username*/}
              {formError.username && (
                <span className="err">{formError.username}</span>
              )}
            </label>

            <label className="all-labels" htmlFor="password">
              Password
              {formInput.password.length < 8 && (
                <span className="register-setup">
                  {" "}
                  • Passwords must be between 8 - 20 characters in length.
                </span>
              )}
              <input
                className="register-input"
                type="password"
                placeholder="Enter a valid password"
                name="password"
                minLength="8"
                maxLength="20"
                value={formInput.password}
                onChange={(e) => {
                  //when user enters password, pass the name + value of event as arguments to handleUserInput function
                  handleUserInput(e.target.name, e.target.value);
                }}
              />
              {/*Error with password input will render span with error message */}
              {formError.password && (
                <span className="err">{formError.password}</span>
              )}
            </label>

            <label className="all-labels" htmlFor="confirm-password">
              Confirm Password
              {formInput.confirmPassword.length < 8 && (
                <span className="register-setup">
                  {" "}
                  • Password and Confirm Password must match
                </span>
              )}
              <input
                className="register-input"
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                minLength="8"
                maxLength="20"
                value={formInput.confirmPassword}
                onChange={(e) => {
                  //when user enters password confirmation, pass the name + value of event as arguments to handleUserInput function
                  handleUserInput(e.target.name, e.target.value);
                }}
              />
              {formError.confirmPassword && (
                <span className="err">{formError.confirmPassword}</span>
              )}
            </label>
            <button className="register-btn" type="submit">
              Register
            </button>
          </form>
        </div>
        {registerSuccess && (
          <div className="welcome-notification">Registration successful!</div>
        )}
      </main>
    </>
  );
};

export default Register;

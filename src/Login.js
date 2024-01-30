import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { login } from "./api";

const LogIn = ({
  isLoggedIn,
  setIsLoggedIn,
  setUserAccount,
  userAccount,
  showPost,
  setShowPost,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      loginToken(username, password);
    } catch (error) {
      console.error(error);
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  async function loginToken(username, password) {
    try {
      const authToken = await login(username, password);
      // if successful login, pass true as argument for setIsLoggedIn
      // This conditional ultimately determines whether a Log In attempt results in a redirect to another page (upon success) or not.
      if (authToken) {
        await setIsLoggedIn(true);
        await setUserAccount({
          username,
          password,
          isAuthenticated: true,
          _id: authToken,
        });
        await localStorage.setItem("id", authToken);
      } else {
        alert(
          "That user does not exist, or the user information was not correctly entered."
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main className="login-main">
        <div className="login-container">
          <h1>Log In</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="all-labels" htmlFor="username">
              Username:
              <input
                className="login-input"
                required
                type="text"
                placeholder="Username*"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </label>

            <label className="all-labels" htmlFor="password">
              Password:
              <input
                className="login-input"
                required
                type="password"
                placeholder="Password*"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </label>

            <button className="login-btn" type="submit">
              Log In
            </button>
            <label className="all-labels" htmlFor="signup">
              <Link to="/Register">
                <aside className="signup-link">
                  Don't have an account? Click here to register!
                </aside>
              </Link>
            </label>
          </form>
        </div>
      </main>
    </>
  );
};

export default LogIn;

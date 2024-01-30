import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, userAccount, setUserAccount }) => {
  return (
    <header className="header">
      <nav className="navbar-container">
        <ul className="navbar-list">
          <span className="navbar-left">
            <Link to="/Home">
              <li className="navbar-strangersthings">Stranger's Things</li>
            </Link>
          </span>

          <span className="navbar-right">
            <Link to="/Home">
              <li className="navbar home">HOME</li>
            </Link>
            <Link to="/Posts">
              <li className="navbar posts">POSTS</li>
            </Link>
            <Link to="/Profile">
              <li className="navbar profile">PROFILE</li>
            </Link>
            {/* If not logged in, render links to login and register, else render null */}
            {isLoggedIn ? null : (
              <Link to="/Login">
                <li className="navbar login">LOGIN</li>
              </Link>
            )}
            {isLoggedIn ? null : (
              <Link to="/Register">
                <li className="navbar register">REGISTER</li>
              </Link>
            )}
            {isLoggedIn ? (
              <Link to="/Login">
                <li
                  className="navbar logout"
                  onClick={() => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    setUserAccount({
                      username: "",
                      password: "",
                      isAuthenticated: false,
                      _id: "",
                    });
                  }}
                >
                  LOG OUT
                </li>
              </Link>
            ) : null}
          </span>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

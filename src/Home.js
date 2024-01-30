import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({
  setIsLoggedIn,
  setUserAccount,
  editComplete,
  setEditComplete,
  isLoggedIn,
  userAccount,
}) => {
  return (
    <div className="home-screen-container">
      <div className="home-body">
        <div className="links">
          <p className="check-it-out">Here's some cool places to check out:</p>
          <Link to="/Posts">
            <div className="home-div">POSTS</div>
          </Link>
          <Link to="/Profile">
            <div className="home-div">PROFILE</div>
          </Link>
          {isLoggedIn ? null : (
            <Link to="/Login">
              <div className="home-div">LOGIN</div>
            </Link>
          )}
          {isLoggedIn ? null : (
            <Link to="/Register">
              <div className="home-div">REGISTER</div>
            </Link>
          )}
          {isLoggedIn ? (
            <Link to="/Login">
              <div
                className="home-div"
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
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;

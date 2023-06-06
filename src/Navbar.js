import React from "react"
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
      <header className="header">
      <nav className="navbar-container">
        <ul className="navbar-list">
          <span className="navbar-left">
            {/* <Route path="./App.js"> */}
            <Link to="/src/App.js">
              <li className="navbar-strangersthings">Stranger's Things</li>
            </Link>
            {/* </Route> */}
          </span>
          <span className="navbar-right">
          <Link to="/src/App.js">
            <li className="navbar home">HOME</li>
          </Link>
          <Link to="/src/Posts.js">
            <li className="navbar posts">POSTS</li>
          </Link>
          <Link to="/src/Profile.js">
            <li className="navbar profile">PROFILE</li>
          </Link>
          <Link to="/src/Login.js">
            <li className="navbar login">LOGIN</li>
          </Link>
          </span>
        </ul>
      </nav>
    </header>
    )
  }

  export default Navbar;
import React, { useState } from 'react';
import {Link} from "react-router-dom"
import "./Login.css";
import { login } from './api';
// import {
//     registerUser,
//     fetchPosts
// } from "./api/index.js"

/*login NEED:
1) Navbar with 4 items: Stranger's Things, HOME, POSTS, LOGIN
2) Main section with:
    - H1 title of Log In 
    -section 
    - input for username
    - input for password
    - button to log in
    - sentence of "Don't have an account? Sign Up" with a link to signup page 

    JUNE 6 UPDATE: Consider making username, password into a single state with username and password as properties for a single state object like in register
*/

const LogIn = ({isLoggedIn, setIsLoggedIn, setUserAccount, userAccount, showPost, setShowPost}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //ISSUE: even if incorrect login info, will still log in - try catch block is one approach, maybe just copy register stuff here
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username);
        console.log(password);
        loginToken(username, password)
        setUsername('')
        setPassword('')
    }   

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    async function loginToken(username, password) {
      try {
        console.log("loginToken attempt");
        const authToken = await login(username, password);
        console.log("Logintoken done attempt");
        // if successful login, pass true as argument for setIsLoggedIn
        // This conditional ultimately determines whether a Log In attempt results in a redirect to another page (upon success) or not.
        if (authToken) {
          await setIsLoggedIn(true);
          await setUserAccount({username, password, isAuthenticated: true, _id: authToken });
          await localStorage.setItem("id", authToken)
        } else {
            alert("That user does not exist, or the user information was not correctly entered.")
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
                <form onSubmit={handleSubmit} className="login-form">

                    <label htmlFor="username">Username:    
                    <input className="login-input" required type="text" placeholder="Username*" name='username' value={username} onChange={handleChange} />
                    </label>

                    <label htmlFor="password">Password:
                    <input className="login-input" required type="password" placeholder="Password*" name="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </label>

                    <button type="submit">Log In</button>
                    <label htmlFor="signup">
                        <Link to="/src/Register.js">
                        <aside className="signup-link">Don't have an account? What's wrong with you?</aside>
                        </Link>
                    </label>
                </form>
            </div>
        </main>
    </>
    )


}



export default LogIn;
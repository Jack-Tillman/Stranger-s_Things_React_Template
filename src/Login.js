import React, { useState } from 'react';
import "./Login.css";
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
*/

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username);
        console.log(password)
        setUsername('')
        setPassword('')
    }   

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    return (
    <>
        <main className="login-main">
            <section className="login-section">
                <h1>Log In</h1>
                <form onSubmit={handleSubmit} className="login-form">

                    <label htmlFor="username">    
                    <input type="text" placeholder="Username*" name='username' value={username} onChange={handleChange} />
                    </label>

                    <label htmlFor="password">
                    <input type="text" placeholder="Password*" name="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </label>

                    <button type="submit">Log In</button>
                    <label htmlFor="signup">
                        <aside>Don't have an account? What's wrong with you?</aside>
                    </label>
                </form>
            </section>
        </main>
    </>
    )


}



export default LogIn;
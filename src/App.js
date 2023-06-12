import React, {useState} from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import {
//   registerUser,
//   fetchPosts
// } from "./api/index.js"
import "./App.css";
import LogIn from "./Login";
import Navbar  from "./Navbar";
import Profile from "./Profile";
import Posts from "./Posts";
import Home from "./Home";
import Register from "./Register";
import AddNewPost from "./AddNewPost";


//Will need to include <Routes> and <Route path=""> for each component that are 
//rendered conditionally.
const App = () => {
  //components will be rendered based on state of isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //multiple features are tied to user's account, such as editing posts
  const [userAccount, setUserAccount] = useState({
    username: '', 
    password: '',
    isAuthenticated: false,
    _id: ''
  });

  return( 
  <>
    <BrowserRouter>
      <div className="App wrapper">
      <Navbar 
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      userAccount={userAccount}
      />

          <Route path="/src/App.js">
            <Home 
            isLoggedIn={isLoggedIn}
            userAccount={userAccount}
            />
          </Route>
          
          <Route path="/src/Profile.js">
            <Profile
            isLoggedIn={isLoggedIn}
            userAccount={userAccount}
            />
          </Route>

          <Route path="/src/Posts.js">
            <Posts
            isLoggedIn={isLoggedIn}
            userAccount={userAccount}
            />
          </Route>
          {/* once the user signs in, redirect them to Posts. if they aren't signed in, they will be directed to login page  */}
          <Route path="/src/Login.js">
            {
              (isLoggedIn)
              ?
              (<Posts
                isLoggedIn={isLoggedIn}
                userAccount={userAccount}
              />) 
              :  
            (<LogIn 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userAccount={userAccount}
            setUserAccount={setUserAccount}
            />)
          }
          </Route>

          <Route path="/src/Register.js">
            {/* if user is logged in, render Posts, else render Register **PROBABLY DON'T LEAVE THIS AS THE FINAL SOLUTION, LIKELY NOT BEST PRACTICE */}
            {
            (isLoggedIn) 
            ? 
            (<Posts
              isLoggedIn={isLoggedIn}
              userAccount={userAccount}
              />) 
            : 
            (<Register 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userAccount={userAccount}
            setUserAccount={setUserAccount}
            />)
            }
            
          </Route>

          <Route path="/src/AddNewPost.jsx">
            <AddNewPost
            isLoggedIn={isLoggedIn}
            userAccount={userAccount}
            />
          </Route>
    </div>
    </BrowserRouter>
  </>
)
}
  
// {/* <Register 
//             isLoggedIn={isLoggedIn}
//             setIsLoggedIn={setIsLoggedIn}
//             userAccount={userAccount}
//             setUserAccount={setUserAccount}
//             localStorage={localStorage}
//             setLocalStorage={setLocalStorage}
//             /> */}


export default App;

/*need to display: 
location:
author
  - username
title 
description
price
*/

/*Potential component to show all posts 

const [registeredUsers, setRegisteredUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Promise.all([registerUser(), fetchPosts()])

      .then(([registeredUsers, posts]) => {
        console.log("useEffect worked!")
        setRegisteredUsers(registeredUsers);
        setPosts(posts);
      })
      .catch(console.error);
  }, []);

  return (
  <>
  
    <div className="form">
      <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          let fetchedPosts = await fetchPosts();
          setPosts(fetchedPosts);
          fetchedPosts.data.posts.map((post, id) => {
            return (
              <>
              <div key={post.id}>Location:{post.location.value}{console.log(post)}</div>
              </>
            )
          })
        } catch (error) {
          console.error(error);
        } finally {
          console.log("onsubmit done");
        }
      }}>
        <input placeholder="type here"></input>
        <button>clickme</button>
      </form>
    </div>
 

  </>
  );
}

*/
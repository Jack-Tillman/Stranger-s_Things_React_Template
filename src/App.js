import React, { useState } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
// import {
//   registerUser,
//   fetchPosts
// } from "./api/index.js"
import "./App.css";
import LogIn from "./Login";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Posts from "./Posts";
import Home from "./Home";
import Register from "./Register";
import AddNewPost from "./AddNewPost";
import ViewPost from "./ViewPost";
import EditPost from "./EditPost";

//Will need to include <Routes> and <Route path=""> for each component that are
//rendered conditionally.
const App = () => {
  //components will be rendered based on state of isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //multiple features are tied to user's account, such as editing posts
  const [userAccount, setUserAccount] = useState({
    username: "",
    password: "",
    isAuthenticated: false,
    _id: "",
  });
  const [posts, setPosts] = useState([]);
  //this will hold the specific postID when user clicks on 'view post' button
  const [showPost, setShowPost] = useState({});
  //hold all messages sent to userAccount 
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersPosts, setUsersPosts] = useState([]);
  const [showSinglePost, setShowSinglePost] = useState([]);

  return (
    <>
      <BrowserRouter>
        <div className="App-wrapper">
          <Navbar
            isLoading = {isLoading}
            setIsLoading = {setIsLoading}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userAccount={userAccount}
            setUserAccount={setUserAccount}
          />

          <Route path="/src/App.js">
            <Home
             isLoggedIn={isLoggedIn}
            userAccount={userAccount} />
          </Route>

          <Route path="/src/Profile.js">
            <Profile 
            isLoading = {isLoading}
            setIsLoading = {setIsLoading}
            isLoggedIn={isLoggedIn} 
            userAccount={userAccount} 
            messages={messages}
            setMessages={setMessages}
            posts={posts}
            setPosts={setPosts}
            showPost={showPost}
            setShowPost={setShowPost}
            usersPosts={usersPosts}
            setUsersPosts={setUsersPosts}
            showSinglePost={showSinglePost}
            setShowSinglePost={setShowSinglePost}
            />
          </Route>

          <Route path="/src/Posts.js">
            <Posts
              isLoading = {isLoading}
              setIsLoading = {setIsLoading}
              posts={posts}
              setPosts={setPosts}
              showPost={showPost}
              setShowPost={setShowPost}
              isLoggedIn={isLoggedIn}
              userAccount={userAccount}
              setUserAccount={setUserAccount}
              messages={messages}
              setMessages={setMessages}
              usersPosts={usersPosts}
            setUsersPosts={setUsersPosts}
            showSinglePost={showSinglePost}
            setShowSinglePost={setShowSinglePost}
            />
          </Route>
          {/* once the user signs in, redirect them to Posts. if they aren't signed in, they will be directed to login page  */}
          <Route path="/src/Login.js">
            {isLoggedIn ? <Redirect to="/src/Home.js" /> : (
              <LogIn
                showPost={showPost}
                setShowPost={setShowPost}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userAccount={userAccount}
                setUserAccount={setUserAccount}
              />
            )}
          </Route>

          <Route path="/src/Register.js">
            {/* if user is logged in, render Posts, else render Register **PROBABLY DON'T LEAVE THIS AS THE FINAL SOLUTION, LIKELY NOT BEST PRACTICE */}
            {isLoggedIn ? <Redirect to="/src/Home.js" /> :  (
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userAccount={userAccount}
                setUserAccount={setUserAccount}
              />
            )}
          </Route>

          <Route path="/src/AddNewPost.jsx">
            <AddNewPost
              posts={posts}
              setPosts={setPosts}
              isLoggedIn={isLoggedIn}
              userAccount={userAccount}
              usersPosts={usersPosts}
            setUsersPosts={setUsersPosts}
            />
          </Route>

          <Route path="/src/ViewPost.jsx">
            <ViewPost
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              showPost={showPost}
              setShowPost={setShowPost}
              isLoggedIn={isLoggedIn}
              userAccount={userAccount}
              messages={messages}
              setMessages={setMessages}
              usersPosts={usersPosts}
            setUsersPosts={setUsersPosts}
            showSinglePost={showSinglePost}
            setShowSinglePost={setShowSinglePost}
            />
          </Route>

          <Route path="/src/EditPost">
            <EditPost
              posts={posts}
              setPosts={setPosts}
              showPost={showPost}
              setShowPost={setShowPost}
              isLoggedIn={isLoggedIn}
              userAccount={userAccount}
              messages={messages}
              setMessages={setMessages}
              usersPosts={usersPosts}
            setUsersPosts={setUsersPosts}
            />
          </Route>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;


// {/* <Route path="/src/Login.js">
// {isLoggedIn ? (
//   <Posts
//     posts={posts}
//     setPosts={setPosts}
//     isLoggedIn={isLoggedIn}
//     userAccount={userAccount}
//     showPost={showPost}
//     setShowPost={setShowPost}
//   />
// ) : (
//   <LogIn
//     showPost={showPost}
//     setShowPost={setShowPost}
//     isLoggedIn={isLoggedIn}
//     setIsLoggedIn={setIsLoggedIn}
//     userAccount={userAccount}
//     setUserAccount={setUserAccount}
//   />
// )}
// </Route> */}
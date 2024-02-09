import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import MainSection from "./MainSection";

const App = () => {
  //some components will be rendered based on state of isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //multiple features are tied to user's account, such as editing and deleting posts
  const [userAccount, setUserAccount] = useState({
    username: "",
    password: "",
    isAuthenticated: false,
    _id: "",
  });
  //used for Post related components to try to avoid race-conditions
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
        <div className="App-wrapper">
          <Navbar
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userAccount={userAccount}
            setUserAccount={setUserAccount}
          />

          <MainSection
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userAccount={userAccount}
            setUserAccount={setUserAccount}
          />
        </div>
    </BrowserRouter>
  );
};

export default App;

/* 

  <Route path="/Home">
          <Home
            isLoggedIn={isLoggedIn}
            userAccount={userAccount}
            setEditComplete={setEditComplete}
            editComplete={editComplete}
            setIsLoggedIn={setIsLoggedIn}
            setUserAccount={setUserAccount}
          />
        </Route> 

        <Route path="/Profile">
          <Profile
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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

        <Route path="/Posts">
          <Posts
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
            setEditComplete={setEditComplete}
            editComplete={editComplete}
          />
        </Route>
 
        <Route path="/Login">
          {isLoggedIn ? (
            <Redirect to="/Profile" />
          ) : (
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

        <Route path="/Register">

          {isLoggedIn ? (
            <Redirect to="/Home" />
          ) : (
            <Register
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userAccount={userAccount}
              setUserAccount={setUserAccount}
            />
          )}
        </Route>

        <Route path="/AddNewPost">
          {isLoading ? (
            <Redirect to="/Home" />
          ) : (
            <AddNewPost
              posts={posts}
              setPosts={setPosts}
              isLoggedIn={isLoggedIn}
              userAccount={userAccount}
              usersPosts={usersPosts}
              setUsersPosts={setUsersPosts}
              setIsLoading={setIsLoading}
            />
          )}
        </Route>

        <Route path="/ViewPost">
          {isLoading && showPost === "false" ? (
            <Redirect to="/Home" />
          ) : (
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
          )}
        </Route>

        <Route path="/EditPost">
          {isLoading && editComplete ? (
            <Redirect to="/Home" />
          ) : (
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
              setIsLoading={setIsLoading}
              editComplete={editComplete}
              setEditComplete={setEditComplete}
            />
          )}
        </Route>



*/

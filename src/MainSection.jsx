import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./Login";
import Profile from "./Profile";
import Posts from "./Posts";
import Home from "./Home";
import Register from "./Register";
import AddNewPost from "./AddNewPost";
import ViewPost from "./ViewPost";
import EditPost from "./EditPost";

const MainSection = () => {
  //some components will be rendered based on state of isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //multiple features are tied to user's account, such as editing and deleting posts
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
  //used for Post related components to try to avoid race-conditions
  const [isLoading, setIsLoading] = useState(true);
  const [usersPosts, setUsersPosts] = useState([]);
  const [showSinglePost, setShowSinglePost] = useState([]);
  const [editComplete, setEditComplete] = useState(false);
  return (
    <>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isLoggedIn={isLoggedIn}
                userAccount={userAccount}
                setEditComplete={setEditComplete}
                editComplete={editComplete}
                setIsLoggedIn={setIsLoggedIn}
                setUserAccount={setUserAccount}
              />
            }
          ></Route>

          <Route
            path="/profile"
            element={
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
            }
          ></Route>

          <Route
            path="/posts"
            element={
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
            }
          ></Route>
          {/* once the user signs in, redirect them to Posts. if they aren't signed in, they will be directed to login page  */}
          <Route
            path="/login"
            element={
              <LogIn
                showPost={showPost}
                setShowPost={setShowPost}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userAccount={userAccount}
                setUserAccount={setUserAccount}
              />
            }
          ></Route>

          <Route
            path="/register"
            element={
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userAccount={userAccount}
                setUserAccount={setUserAccount}
              />
            }
          ></Route>

          <Route
            path="/addNewPost"
            element={
              <AddNewPost
                posts={posts}
                setPosts={setPosts}
                isLoggedIn={isLoggedIn}
                userAccount={userAccount}
                usersPosts={usersPosts}
                setUsersPosts={setUsersPosts}
                setIsLoading={setIsLoading}
              />
            }
          ></Route>

          <Route
            path="/viewPost"
            element={
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
            }
          ></Route>

          <Route
            path="/EditPost"
            element={
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
            }
          ></Route>
        </Routes>
    </>
  );
};

export default MainSection;

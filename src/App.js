import React, { useState, useEffect } from "react";
import {
  registerUser,
  fetchPosts
} from "./api/index.js"
import "./App.css";


const App = () => {
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
    <div className="App">
      <h1>Dear World, hello!</h1>
    </div>
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



export default App;

/*need to display: 
location:
author
  - username
title 
description
price




*/
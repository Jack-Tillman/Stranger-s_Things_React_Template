import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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


//Will need to include <Routes> and <Route path=""> for each component that are 
//rendered conditionally.
const App = () => {


  return( 
  <>
    <BrowserRouter>
      <div className="App wrapper">
      <Navbar />
        <Routes>
          <Route path="/src/App.js" element={<Home />}>
          </Route>
          <Route path="/src/Profile.js" element={<Profile />}>
          </Route>
          <Route path="/src/Posts.js" element={<Posts />}>
          </Route>
          <Route path="/src/Login.js" element={<LogIn />}>
          </Route>
        </Routes>
        
    </div>
    </BrowserRouter>
  </>
)
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
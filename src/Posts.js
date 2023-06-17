import React, {useEffect } from "react";
import {Link} from "react-router-dom";  
import "./Posts.css";
import { fetchPosts } from "./api";

// const COHORT_NAME = '2303-FTB-ET-WEB-AM';
// const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Posts = ({showSinglePost, setShowSinglePost, isLoading, setIsLoading, isLoggedIn, posts, setPosts, usersPosts, setUsersPosts, userAccount, setUserAccount, showPost, setShowPost, messages, setMessages}) => {

  useEffect(() => {
    const startFetchPosts = async () => {
      try {
        const authToken = userAccount._id;
        fetchPosts(authToken).then((posts) => {setPosts(posts.data.posts)})
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } 
    }
    if (isLoading || !posts) {
        startFetchPosts();
      }
  },[setIsLoading, isLoading, userAccount._id, setPosts, posts])
  
  // fetchPosts(authToken)
  //   .then((posts) => {setPosts(posts.data.posts)})
  //   .catch((error) => {
  //     console.error(error)
  //   });
  if (!isLoading) {
    return(
        <>
        <div className="posts-wrapper">
            <section className="post-section">
                <h1 className="h1-posts">Posts</h1>
                <div className="search-posts-wrapper">
                    <input className="search-posts" type="text" placeholder="Search Posts" />
                </div>
                <Link to="/src/AddNewPost.jsx">
                <span className="add-post">
                  (ADD POST)
                  </span>
                </Link>
            </section>
            <div className="all-posts">
          {
            posts.map(post => (
                <div className="full-post" key={post._id}>
                    <div className="title">{post.title}</div>
                    <div className="description">{post.description}</div>
                    <div className="price">{post.price}</div>
                    <div className="author">{post.author.username}</div>
                    <div className="location">{post.location}</div>
                    <div className="willDeliver">{post.willDeliver}</div>
                    { //if user is logged in, button links to single post view, else 
                    // the button links to Login page
                      (isLoggedIn) ? 
                    <Link to="/src/ViewPost.jsx">
                    <button className="viewpost-btn" onClick={()=> {
                      console.log(showPost);
                      const postId = post._id;
                      const postAuthor = post.isAuthor;
                      setShowPost({postId, postAuthor});
                      localStorage.setItem("postid", postId);
                      // setPosts(posts);
                      setIsLoading(true);
                    }}>VIEW POST</button>
                  </Link>
                  : 
                  <Link to="/src/Login.js">
                  <button className="viewpost-btn" onClick={()=> {
                    const postId = post._id;
                    const postAuthor = post.isAuthor;
                    setShowPost({postId, postAuthor});
                    localStorage.setItem("postid", postId);
                  }}>VIEW POST</button>
                </Link>
                    }
                </div>)
              )
          }
        </div>
        </div>
        </>
    )
 }
}

export default Posts;

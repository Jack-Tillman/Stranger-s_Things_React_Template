import React, {useEffect, useState } from "react";
import {Link, Redirect} from "react-router-dom";  
import "./Posts.css";
import { fetchPosts } from "./api";

// const COHORT_NAME = '2303-FTB-ET-WEB-AM';
// const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Posts = ({showSinglePost, setShowSinglePost, isLoading, setIsLoading, isLoggedIn, posts, setPosts, usersPosts, setUsersPosts, userAccount, setUserAccount, showPost, setShowPost, messages, setMessages, editComplete, setEditComplete}) => {
  const [searchTerm, setSearchTerm] = useState('');
  //fetch all posts 
  useEffect(() => {
    const startFetchPosts = async () => {
      try {
        const authToken = userAccount._id;
        fetchPosts(authToken).then((posts) => {
          setPosts(posts.data.posts)
        })
        setIsLoading(false);
        setEditComplete(false);
      } catch (error) {
        console.error(error);
      } 
    }
    if (isLoading || !posts) {
        startFetchPosts();
      }
  },[setIsLoading, isLoading, userAccount._id, setPosts, posts])
  

  function postMatches(post, text) {
    if (post._id.includes(text)) {
      return true;
    }
    if (post.title.toUpperCase().includes(text) || post.title.toLowerCase().includes(text) || post.title.includes(text)) {
      return true;
    }
    if (post.description.toUpperCase().includes(text) || post.description.toLowerCase().includes(text) || post.description.includes(text)){
      return true;
    }
    if (post.location.toUpperCase().includes(text) || post.location.toLowerCase().includes(text) || post.location.includes(text)){
      return true;
    }
    if (post.author.username.toUpperCase().includes(text) || post.author.username.toLowerCase().includes(text) || post.author.username.includes(text)){
      return true;
    }
  }
  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  if (!isLoading) {

    return(
        <>
        <div className="posts-wrapper">
            <section className="post-section">
                <h1 className="h1-posts">Posts</h1>
                <div className="search-posts-wrapper">
                  <form
                  id="search"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    console.log(filteredPosts)
                    //code to filter stuff i guess
                  }}>


                    <input 
                    className="search-posts" 
                    type="text" 
                    placeholder="Search Posts"
                    value={searchTerm}
                    onChange={(e)=> {
                      setSearchTerm(e.target.value)
                      console.log(searchTerm)
                    
                    }}

                    /> 
                  </form>
                </div>
                {
                isLoggedIn ? 
                <Link to="/src/AddNewPost.jsx">
                <span className="add-post">
                  ADD POST
                  </span>
                </Link> 
                :
                <Link to="/src/Login.js">
                    <span className="add-post">
                  ADD POST
                  </span> </Link>
  
              }
            </section>
            <div className="all-posts">
          {
            
            postsToDisplay.map(post => (
                <div className="full-post" key={post._id}>
                    <div className="title">{post.title}</div>
                    <div className="description">{post.description}</div>
                    <div className="price">{`Price: ${post.price}`}</div>
                    <div className="author">{`Seller: ${post.author.username}`}</div>
                    <div className="location">{`Location: ${post.location}`}</div>
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

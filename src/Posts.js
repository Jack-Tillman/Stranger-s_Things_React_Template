import React, {useEffect } from "react";
import {Link} from "react-router-dom";  
import "./Posts.css";
import { fetchPosts } from "./api";

// const COHORT_NAME = '2303-FTB-ET-WEB-AM';
// const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Posts = ({posts, setPosts, userAccount, setUserAccount, showPost, setShowPost}) => {
  
  useEffect(() => {
    const authToken = userAccount._id;
    fetchPosts(authToken)
      .then((posts) => {setPosts(posts.data.posts)})
      .catch((error) => {
        console.error(error)
      });}
      ,[userAccount._id, setPosts])


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
                    <Link to="/src/ViewPost.jsx">
                    <button className="viewpost-btn" onClick={()=> {
                      const postId = post._id;
                      const postAuthor = post.author._id;
                      localStorage.setItem("postid", postId);
                      setShowPost(postId);
                      // console.log(posts)
                      console.log(`Post author is: ${postAuthor}`)
                    }}>VIEW POST</button>
                  </Link>
                  
                </div>)
              )
          }
        </div>
        </div>
        </>
    )

}

export default Posts;


  //old fetch that works 
  //   const fetchPosts = async (authToken) => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/posts`)
  //       const returned = await response.json();
  //       const usableReturned = returned.data.posts;
  //       console.log('returned: ', usableReturned);
  //       setPosts(usableReturned);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchPosts(authToken);
  // })
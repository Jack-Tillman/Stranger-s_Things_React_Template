import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";  
import "./Posts.css";

const COHORT_NAME = '2303-FTB-ET-WEB-AM';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const Posts = ({showPost, setShowPost}) => {
    const [posts, setPosts] = useState([]);
    console.log('posts: ', posts);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`)
        const returned = await response.json();
        const usableReturned = returned.data.posts;
        console.log('returned: ', usableReturned);
        setPosts(usableReturned);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPosts();
  }, [])

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
            // (getItem.localStorage(post._id)) ? <

            posts.map(post => (
                <div className="full-post" key={post._id}>
                    <div className="title">{post.title}</div>
                    <div className="description">{post.description}</div>
                    <div className="price">{post.price}</div>
                    <div className="author">{post.author.username}</div>
                    <div className="location">{post.location}</div>
                    <div className="willDeliver">{post.willDeliver}</div>
                    <Link to="/src/ViewPost.jsx">
                    <button className="message-btn" onClick={()=> {
                      const postId = post._id;
                      localStorage.setItem("postid", postId);
                      setShowPost(postId);
                      console.log(showPost)
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
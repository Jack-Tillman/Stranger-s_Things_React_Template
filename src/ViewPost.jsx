import React, {useState, useEffect} from "react";
import { fetchPosts } from "./api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Posts.css"
import "./ViewPost.css"


export const COHORT_NAME = '2303-FTB-ET-WEB-AM';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

//current error: returned data is null, so i am not getting the actual post i need
const ViewPost = ({ posts, setPosts, showPost, setShowPost }) => {
  
  const currentPostId = localStorage.getItem("postid")
  const [showSinglePost, setShowSinglePost] = useState([]);
  console.log(currentPostId)

  useEffect(() => {
    let cleanup = true;
    //fetch posts, then filter the posts based on currentPostId
    fetchPosts().then(posts => {
        // let postid
        // let singlePost = posts.filter((._id))
        console.log(posts);
        console.log(posts.data.posts)
        let singlePost = posts.data.posts.filter((post) => {
          return post._id === currentPostId;
        })
        setShowSinglePost(singlePost);
        console.log(singlePost)
        return singlePost;
      })
    .catch((error) => {
      console.error(error);
    })
    
    // return () => {
    //   cleanup = false;
    // }
    },[])

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/posts/${currentPostId}`);
  //       const returned = await response.json();
  //       const usableReturned = returned.data.posts;
  //       console.log("returned: ", usableReturned);
  //       await setPosts(usableReturned);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchPosts();
  // }, [setPosts, currentPostId ]);

  return (
    <>
      <div className="posts-wrapper">
        <section className="post-section">
          <h1 className="h1-posts">Posts</h1>
          <div className="search-posts-wrapper">
            <input
              className="search-posts"
              type="text"
              placeholder="Search Posts"
            />
          </div>
          <Link to="/src/AddNewPost.jsx">
            <span className="add-post">(ADD POST)</span>
          </Link>
        </section>
        <div className="single-post-container">
        {
            // (getItem.localStorage(post._id)) ? <

            showSinglePost.map(post => (
                <div className="single-body" key={post._id}>
                    <div className="title">{post.title}</div>
                    <div className="description">{post.description}</div>
                    <div className="price">{post.price}</div>
                    <div className="author">{post.author.username}</div>
                    <div className="location">{post.location}</div>
                    <div className="willDeliver">{post.willDeliver}</div>
                    <Link to="/src/Posts.js">
            <button
              onClick={() => {
                localStorage.removeItem("postid");
                setShowPost(false);
              }}
            >Go back</button>
          </Link>
                  
                </div>)
              )
          }





         
        </div>
      </div>
    </>
  );
};

export default ViewPost;
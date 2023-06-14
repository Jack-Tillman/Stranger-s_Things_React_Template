import React, {useState, useEffect} from "react";
import { fetchPosts, deletePost } from "./api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Posts.css"
import "./ViewPost.css"


export const COHORT_NAME = '2303-FTB-ET-WEB-AM';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// eslint-disable-next-line no-unused-vars
const newguy123id = "64871d300911550014fb4a1b";
//current error: returned data is null, so i am not getting the actual post i need
const ViewPost = ({ isLoggedIn, userAccount, posts, setPosts, showPost, setShowPost }) => {
  const currentPostId = localStorage.getItem("postid");
  const [showSinglePost, setShowSinglePost] = useState([]);
  console.log(`currentPostId: ${currentPostId}`);
  console.log(`currentAccountId: ${userAccount._id}`);
  const authToken = userAccount._id;
  useEffect(() => {
    //potential cleanup function, not used atm as it causes lag
    // let cleanup = true;
    const authToken = userAccount._id;
    // console.log(authToken);
    //fetch posts, then filter the posts based on currentPostId
    fetchPosts(authToken)
      .then((post) => {
        let singlePost = post.data.posts.filter((post) => {
          return post._id === currentPostId;
        });
        setShowSinglePost(singlePost);
        console.log(singlePost);
        return singlePost;
      })
      .catch((error) => {
        console.error(error);
      });

    // return () => {
    //   cleanup = false;
    // }
    //adding additional dependencies the linter suggests causes infinite rendering
  }, [currentPostId, userAccount._id]);




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
          {showSinglePost.map((post) => (
            <div className="single-body" key={post._id}>
              <div className="title">{post.title}</div>
              <div className="description">{post.description}</div>
              <div className="price">{post.price}</div>
              <div className="author">{post.author.username}</div>
              <div className="location">{post.location}</div>
              <div className="willDeliver">{post.willDeliver}</div>
              {/* if messages, show them, else show no messages */}
              {
                (post.messages.length > 0) ?
                <div className="viewMessages">{post.messages}</div>
                :
                <div className="viewMessages">No messages</div>
              }
              <div className="viewMessages">{post.messages}</div>
              <div className="viewpost-btn-container">
              <Link to="/src/Posts.js">
                <button
                  onClick={() => {
                    localStorage.removeItem("postid");
                    setShowPost('false');
                    setShowSinglePost('');
                  }}
                >
                  Go back
                </button>
              </Link>

              <Link to="/">
              <button
              className="message-btn"
              onClick={() => {
                  localStorage.removeItem("postid");
                  setShowPost('false');
                  setShowSinglePost('');
              }}>
              Message</button>
              </Link>

              <button 
              className="delete-btn"
              onClick={() => {
                const singlePostId = showSinglePost[0]._id;
                deletePost(singlePostId, authToken);

              }}>delete
              </button>
              <Link to="/src/EditPost">
              <button 
              className="edit-btn"
              onClick={()=> {
                console.log("Time to edit!");
              }}>Edit</button>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewPost;
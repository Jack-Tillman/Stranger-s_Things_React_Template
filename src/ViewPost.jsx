import React, {useState, useEffect} from "react";
import { fetchPosts, deletePost, postMessage } from "./api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Posts.css"
import "./ViewPost.css"


export const COHORT_NAME = '2303-FTB-ET-WEB-AM';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

//MAKE SURE to show messages regarding this post underneath the post later 

const ViewPost = ({
  isLoggedIn,
  userAccount,
  posts,
  setPosts,
  showPost,
  setShowPost,
  messages,
  setMessages,
}) => {

  const currentPostId = showPost.postId;
  const currentAuthor = showPost.postAuthor;
  const authToken = userAccount._id;
  const [isCurrentAuthor, setIsCurrentAuthor] = useState(false);
  //conditionally render message form if user clicks button
  const [showMessageForm, setShowMessageForm] = useState(false);

  //holds value of message, postId, userAccount auth token
  const [createMessage, setCreateMessage] = useState({
    message: "",
  });

  const [showSinglePost, setShowSinglePost] = useState([]);
  // console.log(`currentPostId: ${currentPostId}`);
  // console.log(`currentAccountId: ${userAccount._id}`);

  useEffect(() => {
    //potential cleanup function, not used atm as it causes lag
    //fetch posts, then filter the posts based on currentPostId
    fetchPosts(userAccount._id)
      .then((post) => {
        let singlePost = post.data.posts.filter((post) => {
          return post._id === currentPostId;
        });
        setShowSinglePost(singlePost);
        setIsCurrentAuthor(post.isAuthor)
        console.log(singlePost);
        console.log(isCurrentAuthor)
        return singlePost;
      })
      .catch((error) => {
        console.error(error);
      });

    //adding additional dependencies the linter suggests causes infinite rendering
  }, [currentPostId, isCurrentAuthor, userAccount._id ]);

  const handleMessageInput = (name, value) => {
    setCreateMessage({
      [name]: value,
      currentPostId: `${currentPostId}`,
      authToken: `${authToken}`,
    });
  };

  const validateMessage = (e) => {
    e.preventDefault();
    if (createMessage.message) {
      postMessage(createMessage);
    }
    setCreateMessage({
      message: "",
    });
  };

  return (
    <>
      <div className="posts-wrapper">
        {/* <section className="post-section">
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
        </section> */}
        {showSinglePost.map((post) => (
          <div className="single-post-container" key={post._id}>
            <div className="single-body">
              <div className="title">{post.title}</div>
              <div className="description">{post.description}</div>
              <div className="price">{post.price}</div>
              <div className="author">{post.author.username}</div>
              <div className="location">{post.location}</div>
              <div className="willDeliver">{post.willDeliver}</div>
              <div className="viewpost-btn-container">
                <Link to="/src/Posts.js">
                  <button
                    onClick={() => {
                      localStorage.removeItem("postid");
                      setShowPost("false");
                      setShowSinglePost("");
                    }}
                  >
                    Go back
                  </button>
                </Link>
                {
                  (!currentAuthor) ?
                <button
                  className="message-btn"
                  onClick={() => {
                    console.log(currentAuthor)
                    console.log(userAccount._id)
                    setShowMessageForm(true);
                  }}
                >
                  Message
                </button>
                : null}
                {
                (showMessageForm && (!currentAuthor)) ? (
                  <form className="message-form" onSubmit={validateMessage}>
                    <input
                      className="message-input"
                      type="text"
                      placeholder="What do you want to say?"
                      name="message"
                      minLength="1"
                      value={createMessage.message}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleMessageInput(e.target.name, e.target.value);
                      }}
                    />
                    <button
                      className="send-message-btn"
                      onSubmit={validateMessage}
                    >
                      send message
                    </button>
                  </form>
                ) : null}
                {
                  //if user wrote post, display delete button, else nothing
                (currentAuthor) ?
                <button
                  className="delete-btn"
                  onClick={() => {
                    const singlePostId = showSinglePost[0]._id;
                    deletePost(singlePostId, authToken);
                  }}
                >
                  delete
                </button> : null}
                { 
                (currentAuthor) ?
                  <Link to="/src/EditPost">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      console.log("Time to edit!");
                    }}
                    >
                    Edit
                  </button>
                </Link>
                : null
                  }
              </div>
              {//if no messages, display nothin'
              (post.messages.length > 0 )
              ? (<div className="post-message-container">
                <div className="message-display">
                  <h1 className="message-display-h1">Messages about this post:</h1>
                  {post.messages.map((message, index) => {
                    return( 
                    <div className="message-wrapper" key={index}>
                        <div className="message-display-div fromUser-id">{message.fromUser._id}</div>
                        <div className="message-display-div fromUser-username">{message.fromUser.username}</div>
                        <div className="message-display-div message-content">{message.content}</div>
                    </div>)
                        
                  })}
                </div>
              </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewPost;
import React, { useState, useEffect } from "react";
import { fetchPosts, deletePost, postMessage } from "./api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./ViewPost.css";

const ViewPost = ({
  isLoggedIn,
  userAccount,
  posts,
  setPosts,
  showPost,
  setShowPost,
  messages,
  setMessages,
  setIsLoading,
}) => {
  const currentPostId = showPost.postId;
  const currentAuthor = showPost.postAuthor;
  const authToken = userAccount._id;
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [isCurrentAuthor, setIsCurrentAuthor] = useState(false);
  //conditionally render message form if user clicks button
  const [showMessageForm, setShowMessageForm] = useState(false);

  //holds value of message, postId, userAccount auth token
  const [createMessage, setCreateMessage] = useState({
    message: "",
  });

  const [showSinglePost, setShowSinglePost] = useState([]);

  useEffect(() => {
    //fetch posts, then filter the posts based on currentPostId
    fetchPosts(userAccount._id)
      .then((post) => {
        let singlePost = post.data.posts.filter((post) => {
          return post._id === currentPostId;
        });
        setShowSinglePost(singlePost);
        setIsCurrentAuthor(post.isAuthor);
        return singlePost;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPostId, isCurrentAuthor, userAccount._id]);

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
        {showSinglePost.map((post) => (
          <div className="single-body" key={post._id}>
            <div className="title">{post.title}</div>
            <div className="description">{post.description}</div>
            <div className="price">{`Price: ${post.price}`}</div>
            <div className="author">{`Seller: ${post.author.username}`}</div>
            <div className="location">{`Location: ${post.location}`}</div>
            <div className="willDeliver">{post.willDeliver}</div>
            <div className="viewpost-btn-container">
              <Link to="/Posts">
                <button
                  className="back-btn"
                  onClick={() => {
                    localStorage.removeItem("postid");
                    setShowPost("false");
                    setShowSinglePost("");
                  }}
                >
                  Go back
                </button>
              </Link>
              {!currentAuthor ? (
                <button
                  className="message-btn"
                  onClick={() => {
                    setShowMessageForm(!showMessageForm);
                  }}
                >
                  Message
                </button>
              ) : null}
              {showMessageForm && !currentAuthor ? (
                <form className="message-form" onSubmit={validateMessage}>
                  <button
                    id="message-btn"
                    className="send-message-btn"
                    onSubmit={validateMessage}
                  >
                    send message
                  </button>
                  <input
                    className="message-input"
                    type="text"
                    placeholder="What do you want to say?"
                    name="message"
                    minLength="1"
                    value={createMessage.message}
                    onChange={(e) => {
                      handleMessageInput(e.target.name, e.target.value);
                    }}
                  />
                </form>
              ) : null}
              {
                //if user wrote post, display delete button, else nothing
                currentAuthor ? (
                  <button
                    className="delete-btn"
                    onClick={() => {
                      const singlePostId = showSinglePost[0]._id;
                      deletePost(singlePostId, authToken);
                      setShowSuccessDelete(true);
                      setTimeout(() => {
                        setIsLoading(true);
                        setShowPost("false");
                      }, "1000");
                    }}
                  >
                    delete
                  </button>
                ) : null
              }
              {currentAuthor ? (
                <Link to="/EditPost">
                  <button className="edit-btn" onClick={() => {}}>
                    Edit
                  </button>
                </Link>
              ) : null}
            </div>
            {
              //if no messages, display nothin'
              post.messages.length > 0 ? (
                <div className="post-message-container">
                  <div className="message-display">
                    <h1 className="message-display-h1">
                      Messages about this post:
                    </h1>
                    {post.messages.map((message, index) => {
                      return (
                        <div className="message-wrapper" key={index}>
                          {/* <div className="message-display-div fromUser-id">{message.fromUser._id}</div> */}
                          <div className="message-display-div fromUser-username">{`From: ${message.fromUser.username}`}</div>
                          <div className="message-display-div message-content">
                            {message.content}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null
            }
          </div>
        ))}
      </div>
      {showSuccessDelete ? (
        <div className="delete-notification">Post deleted!</div>
      ) : null}
    </>
  );
};

export default ViewPost;

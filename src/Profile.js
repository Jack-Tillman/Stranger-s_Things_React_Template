import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { myData } from "./api";
import "./Posts.css";
import "./Profile.css";

const Profile = ({
  showSinglePost,
  setShowSinglePost,
  usersPosts,
  setUsersPosts,
  isLoading,
  setIsLoading,
  isLoggedIn,
  userAccount,
  posts,
  setPosts,
  messages,
  setMessages,
  setShowPost,
  showPost,
}) => {
  const [usersMessages, setUsersMessages] = useState({});

  //fetch request for user data only executes if user logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const authToken = userAccount._id;
        const data = await myData(authToken);
        setUsersMessages(data.data.messages);
        setUsersPosts(data.data.posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (isLoggedIn) {
      fetchData();
    }
  }, [userAccount._id, isLoggedIn, setIsLoading, setUsersPosts]);

  if (!isLoggedIn) {
    return (
      <section className="profile-top-section">
        <h1 className="profile-h1">{`Welcome, please sign in to see your profile!`}</h1>
        <Link to="/Login">
          <div className="sign-in-link">Sign in here!</div>
        </Link>
      </section>
    );
  } else {
    return (
      <>
        <section className="profile-top-section">
          <h1>{`Welcome, ${userAccount.username}!`}</h1>
        </section>
        <main className="profile-main">
          <section className="profile-posts-section">
            <h3 className="profile-message-h3">Messages to me:</h3>
            {usersMessages.length > 0 ? (
              usersMessages.map(
                ({ _id, content, fromUser: { username }, post }) => {
                  return (
                    <div className="profile-message-container" key={_id}>
                      <div className="profile-message-wrapper">
                        <div className="profile-message-fromUser">
                          {`From: ${username}`}
                        </div>
                        <div className="profile-message-content">
                          {`Message: ${content}`}
                        </div>
                        <div className="profile-message-postId">
                          {`PostId: ${post._id}`}
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="profile-none-display">no messages</div>
            )}

            {/* users posts */}

            <h3 className="profile-posts-h3">Posts I have made:</h3>
            {usersPosts.length > 0 ? (
              usersPosts.map(
                ({ _id, title, description, price, location, willDeliver }) => {
                  return (
                    <div className="all-posts profile-post-all-posts" key={_id}>
                      <div className="full-post profile-post-full-post">
                        <div className="title profile-post-title">
                          {`Title: ${title}`}
                        </div>
                        <div className="description profile-post-description">
                          {`Description: ${description}`}
                        </div>
                        <div className="price profile-post-price">
                          {`Price: ${price}`}
                        </div>
                        <div className="location profile-post-location">
                          {`Location: ${location}`}
                        </div>
                        <div className="willDeliver profile-post-willDeliver">
                          {willDeliver}
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="profile-none-display">You've made no posts.</div>
            )}
          </section>
        </main>
      </>
    );
  }
};

export default Profile;


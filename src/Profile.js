import React, {useState, useEffect} from "react";
import { myData } from "./api";
import "./Posts.css"

const Profile = ({showSinglePost, setShowSinglePost, usersPosts, setUsersPosts, isLoading, setIsLoading, isLoggedIn, userAccount, posts, setPosts, messages, setMessages, setShowPost, showPost}) => {
const [usersMessages, setUsersMessages] = useState({});
//this is not ideal, but i have spent too much time trying to figure ways around it. OH WELL!



//fetch request for user data only executes if user logged in
    useEffect(()=> {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const authToken = userAccount._id;
                const data = await myData(authToken);
                setUsersMessages(data.data.messages);
                setUsersPosts(data.data.posts);
                // setPosts(data.data.posts)
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        if (isLoggedIn) {
            fetchData();
        } 
    }, [userAccount._id, isLoggedIn, setIsLoading, setUsersPosts]);

    console.log(usersMessages);
    console.log(usersPosts);
    console.log(showSinglePost)

    
    if (!isLoggedIn) {
        return (
        <section className="profile-top-section"> 
         <h1>{`Welcome, please sign in to see your profile!` }</h1>
        </section> )
        //if user is logged in, and useEffect executes, return the actual page 
    } else if (isLoggedIn && (usersMessages.length < 1)){
      return (
        <>
        <section className="profile-top-section"> 
        <h1>{`Welcome, ${userAccount.username}!` }</h1>
        </section>
        <main className="profile-main">
          <section className="profile-posts-section">
                <h3 className="profile-message-h3">You have no messages!</h3>
          </section>
        </main>
        </>
      )
    } else if ((usersMessages.length > 0) && isLoggedIn){ 
    return(
        <>
        <section className="profile-top-section"> 
         <h1>{`Welcome, ${userAccount.username}!` }</h1>
        </section>
        <main className="profile-main">
            <section className="profile-posts-section">
                <h3 className="profile-message-h3">Messages to me:</h3>
                { usersMessages ? usersMessages.map(
                        (
                            {_id, content, fromUser: {username}, post}
                        ) => {
                        return (
                          <div className="profile-message-container" key={_id}>
                            <div className="profile-message-fromUser">
                              From: {username}
                            </div>
                            <div className="profile-message-content">
                              {content}
                            </div>
                              {/* <button
                                className="viewpost-btn"
                                onClick={() => {
                                    // <Posts />
                                    const postId = post._id;
                                    const postAuthor = post.isAuthor;
                                    console.log(postId, postAuthor)
                                    setShowPost({ postId, postAuthor });
                                    localStorage.setItem("postid", postId);
                                }}
                              >
                                VIEW POST
                              </button> */}
                            <div className="profile-message-postId">
                              {post._id}
                            </div>
                          </div>
                        );}) : 
                          <div>no messages</div>
                        }

                        {/* users posts */}

                        <h3 className="profile-posts-h3">Posts I have made:</h3>
                        { usersPosts ? usersPosts.map(
                        (
                            {_id, title, description, price, location, willDeliver }
                        ) => {
                        return (
                          <div className="all-posts profile-post-all-posts" key={_id} >
                            <div className="full-post profile-post-full-post" >
                            <div className="title profile-post-title">
                              {title}
                            </div>
                            <div className="description profile-post-description">
                              {description}
                            </div>
                            <div className="price profile-post-price">
                              {price}
                            </div>
                            <div className="location profile-post-location">
                              {location}
                            </div>
                            <div className="willDeliver profile-post-willDeliver">
                              {willDeliver}
                            </div>
                            </div>
                          </div>
                        );}) : 
                          <div>You've made no posts.</div>
                        }
            </section>
        </main>
        </>
        )
      }
    }
    
    export default Profile;
    
    // {/* <button
    //   className="viewpost-btn"
    //   onClick={() => {
    //       // <Posts />
    //       const postId = post._id;
    //       const postAuthor = post.isAuthor;
    //       console.log(postId, postAuthor)
    //       setShowPost({ postId, postAuthor });
    //       localStorage.setItem("postid", postId);
    //   }}
    // >
    //   VIEW POST
    // </button> */}
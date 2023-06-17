import React, {useState, useEffect} from "react";
import { myData } from "./api";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ViewPost from "./ViewPost";
import Posts from "./Posts";

const Profile = ({showSinglePost, setShowSinglePost, usersPosts, setUsersPosts, isLoading, setIsLoading, isLoggedIn, userAccount, posts, setPosts, messages, setMessages, setShowPost, showPost}) => {
const [usersMessages, setUsersMessages] = useState({});
setIsLoading(true);


//fetch request for user data only executes if user logged in
    useEffect(()=> {
        const fetchData = async () => {
            try {
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
    }, []);

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
                          <div className="profile-post-container" key={_id}>
                            <div className="profile-post-fromUser">
                              From: {username}
                            </div>
                            <div className="profile-post-content">
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
                            <div className="profile-post-postId">
                              {post._id}
                            </div>
                          </div>
                        );}) : 
                          <div>no messages</div>
                        }
            </section>
        </main>
        </>
        )
    }
    }
    
export default Profile;

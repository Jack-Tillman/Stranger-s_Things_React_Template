import React, {useState, useEffect} from "react";
import { myData } from "./api";


const Profile = ({isLoggedIn, userAccount, posts, setPosts, messages, setMessages}) => {
const [dataReturn, setDataReturn] = useState({});
const [usersPosts, setUsersPosts] = useState([]);

    useEffect(()=> {
        const authToken = userAccount._id;
        myData(authToken)
            .then((data) => {
                setDataReturn(data.data.messages);
                setUsersPosts(data.data.posts);
            })
            .catch((error)=>{
                console.error(error)
            });
        
    }, [userAccount._id])
    // console.log(dataReturn);
    // console.log(usersPosts);
    console.log(dataReturn);
    console.log(usersPosts)
    return(
        (isLoggedIn) ?
        <>
        <section className="profile-top-section"> 
         <h1>{`Welcome, ${userAccount.username}!` }</h1>
        </section>
        <main className="profile-main">
            <section className="profile-posts-section">
                {
                    dataReturn.map((post) => {
                        const {_id, content, fromUser} = post;
                        <div className="profile-post-container" key={_id}>{console.log(content)}</div>
                    })
                }
            </section>
        </main>
        </>
        :
        <>
        <section className="profile-top-section"> 
        <h1>{`Welcome, please sign in to see your profile!` }</h1>
        </section>
        </> 
        

    )

}

export default Profile;
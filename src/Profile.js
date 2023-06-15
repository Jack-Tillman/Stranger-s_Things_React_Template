import React, {useState, useEffect} from "react";


const Profile = ({isLoggedIn, userAccount, messages, setMessages}) => {

    

    return(
        <>
        <section className="profile-top-section"> 
        <h1>{`Welcome, ${userAccount.username}!` }</h1>
        </section>
        <div>Hey</div>
        </>
    )

}

export default Profile;
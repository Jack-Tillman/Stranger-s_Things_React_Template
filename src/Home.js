import React, {useState, useEffect} from "react";
import { fetchPosts, registerUser } from "./api";

const Home = () => {
//     const [registeredUsers, setRegisteredUsers] = useState([]);
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         Promise.all([registerUser(), fetchPosts()])

//       .then(([registeredUsers, posts]) => {
//         console.log("useEffect worked!")
//         setRegisteredUsers(registeredUsers);
//         setPosts(posts);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//   <>
  
//     <div className="form">
//       <form
//       onSubmit={async (event) => {
//         event.preventDefault();
//         try {
//           let fetchedPosts = await fetchPosts();
//           await setPosts(fetchedPosts);
//           await fetchedPosts.data.posts.map((post, id) => {
//             return (
//               <React.Fragment key={post.id}>
//                 <span className="title">
//                 Location:{post.location.value}{console.log(post)}
//                 </span>
//               </React.Fragment>
//             )
//           })
//         } catch (error) {
//           console.error(error);
//         } finally {
//           console.log("onsubmit done");
//         }
//       }}>
//         <input placeholder="type here"></input>
//         <button>clickme</button>
//       </form>
//     </div>
//   </>
//   )
}


export default Home;
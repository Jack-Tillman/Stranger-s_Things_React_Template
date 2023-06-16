
export const COHORT_NAME = '2303-FTB-ET-WEB-AM';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


export const registerUser = async (username, password) => {
  //check for proper username and password values 
  // console.log(username, password)
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    });
    console.log(username, password);
    const result = await response.json();
    // You can log ▲▲▲ the result
    // here ▼▼▼ to view the json object before returning it
    console.log(result);
    // localStorage.token = result.data.token;
    return result.data.token;
  } catch (err) {
    console.error(err);
  }
};

  export const fetchPosts = async (authToken) => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "GET",
        headers: makeHeaders(authToken)
      });
  
      const result = await response.json();
      // console.log(result);
      // console.log(result.data.posts);
      // console.log(authToken)
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  export const login = async (username, password) => {

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            password: `${password}`
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result.data.token;
    } catch (err) {
      console.error(err);
    }
  }

//helper function for makePosts
function makeHeaders(authToken){
  // console.log(authToken);
  if (authToken) {
    const loggedInHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
    // console.log(loggedInHeader)
    return loggedInHeader;
  } else {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer`
    };
  }
}
  
  //used as arguments for below
  // {authToken, newPost.title, newPost.description, newPost.price, newPost.willDeliver}
  export const makePost = async (formInputObject) => {
    // const madeHeader = makeHeaders(authToken);
    console.log(formInputObject);
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: makeHeaders(formInputObject.authToken),
        body: JSON.stringify({
          post: {
            title: `${formInputObject.title}`,
            description: `${formInputObject.description}`,
            price: `${formInputObject.price}`,
            willDeliver: `${formInputObject.willDeliver}`,
            location: `${formInputObject.location}`
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const deletePost = async (postId, authToken) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
  //updatedFormInputObject needs updated form input data, as well as authToken AND postId of the current post that is being edited 
  export const updatePost = async (updatedFormInputObject) => {
    console.log(updatedFormInputObject);
    try {
      const response = await fetch(`${BASE_URL}/posts/${updatedFormInputObject._id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${updatedFormInputObject.authToken}`
        },
        body: JSON.stringify({
          post: {
            title: `${updatedFormInputObject.title}`,
            description: `${updatedFormInputObject.description}`,
            price: `${updatedFormInputObject.price}`,
            willDeliver: `${updatedFormInputObject.willDeliver}`,
            authToken: `${updatedFormInputObject.authToken}`,
            _id: `${updatedFormInputObject._id}`
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const postMessage = async (createMessage) => {
    const {message, currentPostId, authToken } = createMessage;
    console.log(message, currentPostId, authToken);
    try {
      const response = await fetch(`${BASE_URL}/posts/${currentPostId}/messages`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          message: {
            content: `${message}`
          }
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  //returns user's data, such as messages and posts they've made 
 export const myData = async (authToken) => {

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: makeHeaders(authToken)
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
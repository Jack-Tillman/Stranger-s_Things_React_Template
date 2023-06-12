

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

  export const fetchPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`)
  
      const returned = await response.json();
      console.log(returned);
      console.log(returned.data.posts);
      return returned;
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
      return result
    } catch (err) {
      console.error(err);
    }
  }


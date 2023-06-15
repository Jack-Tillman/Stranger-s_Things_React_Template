import React, {useState} from "react";
import { updatePost } from "./api";

//THIS WORKS YES! BUT, please do refine this and make it easier to read and less redundant 
const EditPost = ({userAccount, posts, setPosts, showPost, setShowPost, isLoggedIn, messages, setMessages}) => {
    
    const [willDeliver, setWillDeliver] = useState(false);
    //filter all posts to display only one post whose post._id matches the same post stored in showPost (which is the post the user clicks on when seeing all posts)
    const [thisPostId] = posts.filter(post => post._id === showPost.postId);
    console.log(thisPostId._id)
    const [updatedFormInput, setUpdatedFormInput] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        willingToDeliver: `${willDeliver}`,
        authToken: `${userAccount._id}`,
        _id: `${thisPostId._id}`
    });

    // eslint-disable-next-line no-unused-vars
    const [formError, setFormError] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        willingToDeliver: `${willDeliver}`,
        authToken: `${userAccount._id}`,
        _id: `${thisPostId._id}`
    });

    // const handleClick = (e) => {
    //     e.preventDefault();

    // }

    const handleUserInput = (name, value) => {
       setUpdatedFormInput({
        //spread operator to make a copy of updatedFormInput object
        ...updatedFormInput,
        //[username] / [password]: (user's input for username / password)
        [name]: value,
       })
    };

    const handleUserInputCheckbox = ({willDeliver}) => {
        setUpdatedFormInput({
            ...updatedFormInput,
            //not sure exactly why, but setting inverse of willDeliver ensures that willDeliver matches what user wants from screen selection
            willingToDeliver: `${!willDeliver}`
        })
    };

    //only numbers 0-9 allowed
    const priceCheck = /^[0-9]+$/;
    const priceResult = priceCheck.test(updatedFormInput.price);
    //this is the function that ultimately submits the post creation template 
    const validateUpdatedFormInput = (e) => {
        e.preventDefault();

        let inputError = {
            title: '',
            description: '',
            price: 0,
            location: ''
        }

        if (!updatedFormInput.title) {
            setFormError({
                ...inputError,
                title: "Please enter a valid title."
            });
            return;
        }

        if (!updatedFormInput.description) {
            setFormError({
                ...inputError,
                description: "Please enter a valid description."
            });
            return;
        }

        if (!updatedFormInput.price || (!priceResult)) {
            setFormError({
                ...inputError,
                price: "Please enter a price in USD, numbers only."
            });
            return;
        }

        if (!updatedFormInput.location) {
            setFormError({
                ...inputError,
                location: "Please enter a valid location."
            });
            return;
        }
        //if the user enters all input fields properly, store the input values within an object
        // that will be passed to the makePost API request
        if ((updatedFormInput.location) && (updatedFormInput.price) && (priceResult) && (updatedFormInput.description) && (updatedFormInput.title) && (isLoggedIn)) {
            const updatedFormInputObject = {
                title: updatedFormInput.title,
                description: updatedFormInput.description,
                price: updatedFormInput.price,
                location: updatedFormInput.location,
                willDeliver: `${willDeliver}`,
                authToken: `${userAccount._id}`,
                _id: `${thisPostId._id}`
            }
            console.log(updatedFormInputObject);
            try{
                //line below is when API call is actually made
                async function editPost() {
                    await updatePost(updatedFormInputObject);

                }
                editPost()
                //reset form inputs
                setUpdatedFormInput({ 
                title: '',
                description: '',
                price: 0,
                location: '',
                willingToDeliver: `${willDeliver}`,
                authToken: `${userAccount._id}`,
                _id: `${thisPostId._id}`
            })
            } catch (error) {
                console.error(error);
            } finally {
                console.log("New post submission attempted");
                setPosts(posts);
            }
            
        }

        setFormError(inputError);
        console.log(updatedFormInput)
        // if (!updatedFormInput.willDeliver) {
        //     setFormError({
        //         ...inputError,
        //     })
        // }
    };

    return (
        <>
        <main className="newpost-main">
            <div className="newpost-container">
                <h3 className="h3-newpost">Add New Post</h3>
                <form className="newpost-form" onSubmit={validateUpdatedFormInput}>
                    <label className="title-label" htmlFor='title'>Title*
                        <input 
                        required
                        className="newpost-input"
                        type="text"
                        placeholder="Title"
                        name="title"
                        minLength="1"
                        maxLength="50"
                        value={updatedFormInput.title}
                        onChange={(e) => {
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                    </label>

                    <label className="description-label" htmlFor='description'>Description*
                        <input 
                        required
                        className="newpost-input"
                        type="text"
                        placeholder="Description"
                        name="description"
                        minLength="1"
                        maxLength="250"
                        value={updatedFormInput.description}
                        onChange={(e) => {
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                    </label>

                    <label className="price-label" htmlFor='price'>Price*
                        <input 
                        required
                        className="newpost-input"
                        type="number"
                        placeholder="Price"
                        name="price"
                        min="1"
                        //no one can make a million bucks on my bootleg craigslist without making more than one post 
                        max="999999"
                        minLength="1"
                        maxLength="10"
                        value={updatedFormInput.price}
                        onChange={(e) => {
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                    </label>
                    
                    <label className="location-label" htmlFor='location'>Location*
                        <input 
                        className="newpost-input"
                        type="text"
                        placeholder="Location"
                        name="location"
                        minLength="1"
                        maxLength="100"
                        value={updatedFormInput.location}
                        onChange={(e) => {
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                    </label>

                    <label className="deliver-label" htmlFor='willingToDeliver'>Willing to Deliver?*
                    <div className="checkbox-container">
                    <input 
                        className="willdeliver-input"
                        type="checkbox"
                        id="willDeliverCheckbox"
                        name="willDeliver"
                        value={updatedFormInput.willDeliver}
                        onChange={(e) => {
                            //wilLDeliver state set to inverse 
                            setWillDeliver(!willDeliver);
                            //new value of willDeliver passed as a prop to handleUserCheckbox function
                            handleUserInputCheckbox({willDeliver});
                        }}
                        />
                    </div>
                    </label>

                    <button className="newpost-btn" type="submit">Create</button>
                </form>
            </div>
        </main>
        </>
    )
}

export default EditPost;
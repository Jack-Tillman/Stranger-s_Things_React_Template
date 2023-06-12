import React, {useState} from 'react';
import './AddNewPost.css'
import { makePost } from './api';

const AddNewPost = ({isLoggedIn, userAccount}) => {
    const [willDeliver, setWillDeliver] = useState(false)
    console.log(willDeliver)
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        willingToDeliver: `${willDeliver}`
    });

    const [formError, setFormError] = useState({
        title: '',
        description: '',
        price: 0,
        location: '',
        willingToDeliver: `${willDeliver}`
    });

    // const handleClick = (e) => {
    //     e.preventDefault();

    // }

    const handleUserInput = (name, value) => {
       setFormInput({
        //spread operator to make a copy of formInput object
        ...formInput,
        //[username] / [password]: (user's input for username / password)
        [name]: value,
       })
    };

    const handleUserInputCheckbox = ({willDeliver}) => {
        setFormInput({
            ...formInput,
            //not sure exactly why, but setting inverse of willDeliver ensures that willDeliver matches what user wants from screen selection
            willingToDeliver: `${!willDeliver}`
        })
        console.log(willDeliver)
    };

    //only numbers 0-9 allowed
    const priceCheck = /^[0-9]+$/;
    const priceResult = priceCheck.test(formInput.price);

    const validateFormInput = (e) => {
        e.preventDefault();

        let inputError = {
            title: '',
            description: '',
            price: 0,
            location: ''
        }

        if (!formInput.title) {
            setFormError({
                ...inputError,
                title: "Please enter a valid title."
            });
            return;
        }

        if (!formInput.description) {
            setFormError({
                ...inputError,
                description: "Please enter a valid description."
            });
            return;
        }

        if (!formInput.price || (!priceResult)) {
            setFormError({
                ...inputError,
                price: "Please enter a price in USD, numbers only."
            });
            return;
        }

        if (!formInput.location) {
            setFormError({
                ...inputError,
                location: "Please enter a valid location."
            });
            return;
        }
        setFormError(inputError);
        console.log(formInput)
        // if (!formInput.willDeliver) {
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
                <form className="newpost-form" onSubmit={validateFormInput}>
                    <label className="title-label" htmlFor='title'>Title*
                        <input 
                        className="newpost-input"
                        type="text"
                        placeholder="Title"
                        name="title"
                        minLength="1"
                        maxLength="50"
                        value={formInput.title}
                        onChange={(e) => {
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                    </label>

                    <label className="description-label" htmlFor='description'>Description*
                        <input 
                        className="newpost-input"
                        type="text"
                        placeholder="Description"
                        name="description"
                        minLength="1"
                        maxLength="250"
                        value={formInput.description}
                        onChange={(e) => {
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                    </label>

                    <label className="price-label" htmlFor='price'>Price*
                        <input 
                        className="newpost-input"
                        type="number"
                        placeholder="Price"
                        name="price"
                        min="1"
                        //no one can make a million bucks on my bootleg craigslist without making more than one post 
                        max="999999"
                        minLength="1"
                        maxLength="10"
                        value={formInput.price}
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
                        value={formInput.location}
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
                        value={formInput.willDeliver}
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

export default AddNewPost;
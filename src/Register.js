import React, { useState } from 'react';

/*
Register utilizes useState to track both user input and errors with user input.
Validation of user inputs occurs upon submission, either when user presses enter within input fields or clicks Register button
handleUserInput will pass a copy of formInput object as an argument for setFormInput.
That copied object contains 3 properties total, each for username, password, and confirmPassword respectively
Upon submission, the user's inputs (held by formInput) are checked for errors within username, password, and confirmPassword fields
If there are any errors within the user's inputs, then the submission does not go through, and a span with an appropriate error message is rendered

TO-DO:
*Feedback for if submission is successful 
*Determine what I will need to pass as props to other components (maybe have a state called isLoggedIn that tracks whether user is logged in,
    and if the user successfully registers, then isLoggedIn is set to true)
*Make the CSS good for this, keeping in mind required pseudoclass for the inputs 
*/

const Register = () => {
    //tracks user input and places username, password, and confirmPassword values in an object 
    const [formInput, setFormInput] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    //tracks errors associated with user input for username, password, and confirmPassword
    const [formError, setFormError] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    
    const handleUserInput = (name, value) => {
       setFormInput({
        //spread operator to make a copy of formInput object
        ...formInput,
        //[username] / [password]: (user's input for username / password)
        [name]: value,
       })
    };

    const validateFormInput = (e) => {
        //prevent page reload
        e.preventDefault();
        //let keyword because inputError may change value
        let inputError = {
            username: "",
            password: "",
            confirmPassword: "",
        }
        //if invalid username & password, pass a copy of inputError object and display error message for both username & password to setFormError
        if (!formInput.username && !formInput.password) {
            setFormError({
                ...inputError,
                username: "Please enter a valid username.",
                password: "Please enter a valid password.",
            });
            return
        }
        //if invalid username, pass copy of inputError object and display error message for username to setFormError
        if (!formInput.username) {
            setFormError({
                ...inputError,
                email:"Please enter a valid username",
            });
            return
        }
        //if password doesn't match password confirmation input, pass copy of inputError and display error message for confirmPassword to setFormError
        if (formInput.confirmPassword !== formInput.password) {
            setFormError({
                ...inputError,
                confirmPassword: "The entries for password and password confirmation must be the same.",
            });
            return
        }
        //if no password entered, display error message and pass the error to setFormError
        if (!formInput.password) {
            setFormError({
                ...inputError,
                password: "Password cannot be empty.",
            });
            return
        }
        //pass whatever inputError exists to setFormError to update state and display the error messages on the screen 
        setFormError(inputError);
    };

    return (
    <>
        <main className="register-main">
            <section className="register-section">
                <h1>Register</h1>
                <form 
                className="register-form"
                onSubmit={validateFormInput}>

                    <label htmlFor="username">Username: 
                        <input
                         type="text" 
                         placeholder="Enter a valid username" 
                         name="username" 
                         value={formInput.username} 
                         onChange={(e) => {
                            //when user enters username, pass the name + value of event as arguments to handleUserInput function
                            console.log(e.target.name)
                            console.log(e.target.value)
                            handleUserInput(e.target.name, e.target.value);
                         }}
                        />
                        {/*Span with error message will render ONLY if there is an error with the username*/}
                    {formError.username && <span className='err'>{formError.username}</span>}
                    </label>

                    <label htmlFor="password">
                        <input 
                        type="password" 
                        placeholder="Enter a valid password" 
                        name="password"
                        value={formInput.password}
                        onChange={(e) => { 
                             //when user enters password, pass the name + value of event as arguments to handleUserInput function
                            handleUserInput(e.target.name, e.target.value);
                        }} 
                        />
                        {/*Error with password input will render span with error message */}
                        {formError.password && <span className='err'>{formError.password}</span>}
                    </label>

                    <label htmlFor="confirm-password">
                        <input 
                        type="password" 
                        placeholder="Confirm your password" 
                        name="confirmPassword" 
                        value={formInput.confirmPassword} 
                        onChange={(e) => {
                             //when user enters password confirmation, pass the name + value of event as arguments to handleUserInput function
                            handleUserInput(e.target.name, e.target.value);
                        }}
                        />
                        {formError.confirmPassword && <span className='err'>{formError.confirmPassword}</span>}
                    </label>
                    <button type="submit">Register</button>
                </form>
            </section>
        </main>
    </>
    )
}

export default Register;
import React from 'react'
import { useState } from 'react';
import Welcome from './Welcome';


const SignUp = () => {

    const [data, setData] = useState({ name: "", email: "", username: "", password: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        //here using e we can get value,name and id of that element
        console.log("eTargetValue===" + e.target.value);
        console.log("eTargetName===" + e.target.id);

        setData(prevData => ({
            ...prevData,
            [id]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Form submitted successfully!' + response);
            setSubmitted(true);
        } else {
            console.error('Form submission failed');
        }
        // const name = document.getElementById('name').value;
        // const email = document.getElementById('email').value;
        // const username = document.getElementById('username').value;
        // const password = document.getElementById('password').value;


        // Handle form submission logic here

    }
    return (
        <div className='form-container'>
            {submitted ?
                <Welcome />
                :
                <form className='form'>
                    <h2>Sign Up</h2>
                    <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" onChange={handleOnChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" onChange={handleOnChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username" onChange={handleOnChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" onChange={handleOnChange} />
                    </div>
                    <button type="submit" className='submit-button' onClick={handleSubmit}>Submit</button>
                </form>

            }
        </div>
    );

}

export default SignUp
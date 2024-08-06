import { React, useState } from 'react';
import Welcome from './Welcome';

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      // Handle HTTP errors
      console.error(`HTTP error! status: ${response.status}`);
      const errorText = await response.text(); // Read plain text error message
      console.error(errorText);
      alert("An error occurred during login: " + errorText);
      return;
    }

    // Read the response as plain text if it's not JSON
    const responseText = await response.text();
    console.log(responseText);
    setSubmitted(true);
    setLoggedIn(true); // Set loggedIn to true on successful login
    // Handle successful response
    alert(responseText); // Use the response text for the success message
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setSubmitted(false);
    setData({ username: "", password: "" }); // Reset form data
  };

  return (
    <>
      <div className='form-container'>
        {loggedIn ? (
          <>
            <Welcome />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <form className='form'>
            <h2>Login</h2>
            <div className='form-group'>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                onChange={handleOnChange}
                value={data.username}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleOnChange}
                value={data.password}
              />
            </div>
            <button type="submit" className='submit-button' onClick={handleSubmit}>Login</button>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;

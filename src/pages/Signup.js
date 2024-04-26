import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../App';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {state,dispatch} = useContext(userContext);

  // const emailRegex = /^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]*[-.]*[a-zA-Z0-9]{2,}$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  const navigate = useNavigate();
  


  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLirstName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // check if the email matches the regex
    if (e.target.value==="" || emailRegex.test(e.target.value)) {
      // clear the error message
      setEmailError("");
    } else {
      // set the error message
      setEmailError("Not a valid email");
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== "" && e.target.value.length < 8) {
      // set the error message
      setPasswordError("Password must be 8 characters or longer");
    } else {
      // clear the error message
      setPasswordError("");
    }
  }

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await fetch('https://elect-server-opal.vercel.app/api/auth/getuser' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
     })
    const userstatus = await user.json()
    console.log(userstatus)

     if(userstatus.status === 'notok'){
      console.log("hi")
      setLoading(false);
      alert('a user already exists with the email')
     }
     else{
        const response = await fetch('https://elect-server-opal.vercel.app/api/auth/register' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
          }),
        }) 
        const data = await response.json()
        console.log(data.token)
        if(data.token) {
          dispatch({type:"SIGNUP"})
          localStorage.setItem('token', data.token)
          // window.location.href = '/dashboard'
          navigate('/dashboard');
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
        else{
          setLoading(false);
          alert('Something went wrong...Please try again!')
    
         }
    }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
     
  }
  return (
    <div class="container bg-light my-5 d-flex justify-content-center">
      <form class="p-3 w-50" onSubmit={handleSubmitChange}>
        <h1 className='d-flex justify-content-center'>Sign Up</h1>
        <div className="mb-3">
          <label for="firstName" class="form-label fw-bold">First name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="mb-3">
          <label for="lastName" class="form-label fw-bold">Last name</label>
          <input type="text" id="lastName" className="form-control" placeholder="Last name" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="mb-3">
          <label for="email" class="form-label fw-bold">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-danger">{emailError}</p>}
        </div>
        <div className="mb-3">
          <label for="password" class="form-label fw-bold">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="text-danger">{passwordError}</p>} 
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <div className="loading-indicator"></div>
              ) : (
                'Sign up'
              )}
          </button>
        </div>
        <p className="d-flex justify-content-center forgot-password text-right">
          Already registered? <a href="/signin"> Sign in</a>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
    
  )
}

export default Signup
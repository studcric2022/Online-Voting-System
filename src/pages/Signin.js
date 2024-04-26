import React,{useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../App';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const {state,dispatch} = useContext(userContext);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://elect-server-opal.vercel.app/api/auth/login' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
     })

     const data = await response.json()

     console.log(data)

     if(data.token) {
      dispatch({type:"USER", payload: true})
      localStorage.setItem('token', data.token)
      console.log(data.token)
      // window.location.href = '/dashboard'
      navigate('/dashboard');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
     }
     else{
      setLoading(false);
      alert('Please check your username/password')

     }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    
     
  }

  return (
    <div class="container bg-light my-5 d-flex justify-content-center">
      <form class="p-3 w-50" onSubmit={handleSubmitChange}>
        <h1 className='d-flex justify-content-center'>Log In</h1>
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
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <div className="loading-indicator"></div>
              ) : (
                'Log in'
              )}
          </button>
        </div>
        <p className="d-flex justify-content-center forgot-password text-right">
          Not registered yet? <a href="/signup">Register</a>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Signin
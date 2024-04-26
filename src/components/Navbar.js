import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import { useContext } from 'react';
import { userContext } from '../App';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {state,dispatch} = useContext(userContext);
  const [user, setUser] = useState(useAuth())
 
 useEffect(()=>{
  setUser(useAuth());
 });
 console.log(user);
  
  const handleLogout = () => {
    
    dispatch({type: "USER", payload: false});
    localStorage.removeItem('token');
    setUser(useAuth())

    console.log(localStorage) 
    navigate('/signin');
    // window.location.reload();
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleHomeClick = () => {
    useEffect(() => {
      if (location.pathname === '/') {
        window.location.reload();
      } else {
        navigate('/');
      }
    }, [location.pathname])
  };

  const handleDashboardClick = () => {
    useEffect(() => {
      if (location.pathname === '/dashboard') {
        window.location.reload();
      } else {
        navigate('/dashboard');
      }
    }, [location.pathname])
  };

  const handleCreateClick = () => {
    useEffect(() => {
      if (location.pathname === '/create') {
        window.location.reload();
      } else {
        navigate('/create');
      }
    }, [location.pathname])
  };

  const handleVoteClick = () => {
    useEffect(() => {
      if (location.pathname === '/vote') {
        window.location.reload();
      } else {
        navigate('/vote');
      }
    }, [location.pathname])
  };

  const handleHelpClick = () => {
    useEffect(() => {
      if (location.pathname === '/help') {
        window.location.reload();
      } else {
        navigate('/help');
      }
    }, [location.pathname])
    
    
  };

  if(!user){
    return (
      <div class="container-fluid bg-dark">
              <nav class="navbar navbar-expand-lg bg-dark navbar-dark text-white fixed-top" style={{paddingLeft: "5rem", paddingRight: "5rem"}}>
                  <a href="#" class="navbar-brand" onClick={(e) => handleClick(e)}>
                      <img class="logo" src="vote-icon-22.jpg" />
                  </a> 
                  <a href="/"><h1 class="fw-bold" style={{paddingLeft: "0.25rem", paddingRight: "1rem",color: "white"}}>Elect.me</h1> </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
                  </button>
                  {/* <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                      <ul class="navbar-nav me-auto" textAlign= 'right' >
                      <div class="collapse navbar-collapse" id="navbarSupportedContent" style= {{textAlign:'right'}}>
                      <li class="nav-item"><Link class="nav-link" to="/" onClick={handleHomeClick}> <a>Home</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/vote" onClick={handleVoteClick}><a>Vote</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/help" onClick={handleHelpClick}>Help</Link></li>
                      </div>
                      </ul> */}
                      <ul class="navbar-nav ms-auto">
                      <div class="collapse navbar-collapse" id="navbarSupportedContent" style= {{paddingRight: "0.25rem"}}>
                      <li class="nav-item"><Link class="nav-link" to="/" onClick={handleHomeClick}> <a>Home</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/vote" onClick={handleVoteClick}><a>Vote</a></Link></li>
                      
                      <li class="nav-item"><a href='/signup'><button type="button" class="btn btn-outline-light me-1">Sign up</button></a></li>
                      <li class="nav-item"><a href='/signin'><button type="button" class="btn btn-outline-light me-1">Sign in</button></a></li>
                      </div>
                      {/* <li class="nav-item"><button class="button" onClick={handleLogout}>Log out</button></li> */}
                      </ul>
                  {/* </div> */}
              </nav>
      </div>
    )

  }else{
    return (
      <div class="container-fluid bg-dark">
              <nav class="navbar navbar-expand-lg bg-dark navbar-dark text-white fixed-top" style={{paddingLeft: "5rem", paddingRight: "5rem"}}>
                  <a href="#" class="navbar-brand" onClick={(e) => handleClick(e)}>
                      <img class="logo" src="vote-icon-22.jpg" />
                  </a> 
                  <a href="/dashboard"><h1 class="fw-bold" style={{paddingLeft: "0.25rem", color: "white"}}>Elect.me</h1> </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
                  </button>
                  {/* <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                      <ul class="navbar-nav ms-auto" textAlign= 'center' >
                      <div class="collapse navbar-collapse" id="navbarSupportedContent" style= {{textAlign:'center'}}>
                      <li class="nav-item"><Link class="nav-link" to="/" onClick={handleHomeClick}> <a>Home</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/dashboard" onClick={handleDashboardClick}> <a>Dashboard</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/create" onClick={handleCreateClick}><a>Create Poll</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/vote" onClick={handleVoteClick}><a>Vote</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/help" onClick={handleHelpClick}>Help</Link></li>
                      </div> */}
                      {/* </ul> */}
                      <ul class="navbar-nav ms-auto">
                      <div class="collapse navbar-collapse" id="navbarSupportedContent" style= {{paddingRight: "0.25rem"}}>
                      <li class="nav-item"><Link class="nav-link" to="/dashboard" onClick={handleDashboardClick}> <a>Dashboard</a></Link></li>
                      <li class="nav-item"><Link class="nav-link" to="/create" onClick={handleCreateClick}><a>Create Poll</a></Link></li>
                      <li class="nav-item"><button type="button" class="btn btn-outline-light" onClick={handleLogout}>Logout</button></li>
                      </div>
                      {/* <li class="nav-item"><button class="button" onClick={handleLogout}>Log out</button></li> */}
                      </ul>
                  {/* </div> */}
              </nav>
      </div>
    )
  }
    
}

export default Navbar
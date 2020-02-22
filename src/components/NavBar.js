import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.getItem('firstName', '');
    sessionStorage.clear();
    location.href = '/login';
  }
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
        <Link className="navbar-brand" to='/'>Free Mentors</Link>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            {
              sessionStorage.getItem('firstName') && (
                <li className="nav-item">
                    <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                  </li>
              )
            }
          </ul>
          <ul className="navbar-nav ml-auto">
            {
              !sessionStorage.getItem('firstName') ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to='/signup'>Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link">{sessionStorage.getItem('firstName')}</span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href='' onClick={handleClick}>Logout</a>
                  </li>
                </>
              )
            }
          </ul>
        </div>
        </div>
      </nav>  
    </>
  )
}

export default NavBar

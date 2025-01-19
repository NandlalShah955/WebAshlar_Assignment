import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart } from 'react-icons/fi';
import '../styles/Navbar.css'; 


const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#fff"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#fff"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#fff"
      />
    </g>
  </svg>
);

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          
          <img src={'https://img.freepik.com/free-vector/open-book-icon-education-symbol-flat-design-vector-illustration_53876-136267.jpg?ga=GA1.1.4184247.1736579379&semt=ais_hybrid'} alt="Must Help Foundation" />
          </Link>
        </div>

        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger style={{color:'white'}}/>
        </div>

        <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/" className="menu-item" >
                Home
              </Link>
            </li>
            <li>
              <Link to="/coursesform" className="menu-item">
                Course Management
              </Link>
            </li>
           
          </ul>
        </div>


        <div className="navbar-right">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
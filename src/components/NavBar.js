import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/video_listing">View All Videos</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/account">User Account</a></li>
      </ul>
    </nav>
//     <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/video_listing`)}}>
//     View All Videos
// </button></h4>
// <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/login`)}}>
//     Login
// </button></h4>
// <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/signup`)}}>
//     Sign Up
// </button></h4>
// <h4><button className="btn btn-link mt-3" onClick={()=>{navigate(`/account`)}}>
//     User Account
// </button></h4>
  );
};

export default Navbar;

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
  );
};

export default Navbar;

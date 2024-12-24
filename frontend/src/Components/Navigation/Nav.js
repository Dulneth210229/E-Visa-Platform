import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

function Nav() {
  return (
    <div>
      {/*Navigation bar */}
      <nav class="navbar">
        <div class="nav-content"></div>
        <div class="logo"></div>
        <div class="nav-links">
          <a href="/">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="/">Apply Now</a>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

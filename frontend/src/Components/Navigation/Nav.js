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
          <a href="/">
            <i className="fas fa-paper-plane"></i>Apply Now
          </a>
          <a href="/">
            <i className="fas fa-info-circle"></i>Visa Status
          </a>
          <a href="/">
            <i className="fas fa-question-circle"></i>Help
          </a>
        </div>
        <div class="nav-login">
          <a href="/">
            <i className="fas fa-sign-in-alt"></i>Login
          </a>
          <a href="/">
            <i className="fas fa-user-plus"></i>Signup
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

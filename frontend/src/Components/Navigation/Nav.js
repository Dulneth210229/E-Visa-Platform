import React from "react";
import "./Nav.css";
import "@fortawesome/fontawesome-free/css/all.css";
import logo from "./images/Logo.png";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Nav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div>
      {/*Navigation bar */}
      <nav class="navbar">
        <div class="nav-content">
          <div class="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div class="nav-links">
            <a href="/">
              <i className="fas fa-home"></i> <span>Home</span>
            </a>
            <a href="/add-visa">
              <i className="fas fa-paper-plane"></i>Apply Now
            </a>
            <a href="/visa-status">
              <i className="fas fa-info-circle"></i>Visa Status
            </a>
            <a href="/">
              <i className="fas fa-question-circle"></i>Help
            </a>
          </div>
          <div class="nav-login">
            {user && (
              <>
                <span class="user-mail">{user.email}</span>
                <a href="/login" onClick={logout}>
                  <i class="fa-solid fa-right-from-bracket"></i>
                  Logout
                </a>
              </>
            )}
            {!user && (
              <>
                <a href="/login">
                  <i className="fas fa-sign-in-alt"></i>Login
                </a>
                <a href="/signup">
                  <i className="fas fa-user-plus"></i>Signup
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

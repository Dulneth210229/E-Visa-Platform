import { useLogout } from "../../hooks/useLogout";
import React from "react";

const Navbar = () => {
  const { logout } = useLogout();
  return (
    <div>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-around;
            background-color: #333;
            padding: 10px;
          }
          .navbar a {
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            font-size: 18px;
          }
          .navbar a:hover {
            background-color: #575757;
            border-radius: 5px;
          }
        `}
      </style>

      <div className="navbar">
        <a href="/admin">Users</a>
        <a href="/visa-details">Visas</a>
        <a href="#summary">Summary</a>
        <a href="/login" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;

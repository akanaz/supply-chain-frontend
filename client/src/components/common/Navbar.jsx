import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth() || {};

  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        {user?.role === "owner" && <>
          <li><NavLink to="/assignroles">Assign Roles</NavLink></li>
          <li><NavLink to="/addproduct">Add Product</NavLink></li>
        </>}
        <li><NavLink to="/supply">Supply</NavLink></li>
        <li><NavLink to="/track">Track</NavLink></li>
        {user ? (
          <li>
            <button
              className="nav-logout"
              onClick={logout}
              style={{
                background: "#bb86fc",
                color: "#232323",
                fontWeight: 700,
                border: "none",
                borderRadius: "8px",
                padding: "11px 22px",
                fontSize: "1.17rem",
                marginLeft: "24px",
                cursor: "pointer",
                transition: "box-shadow 0.19s, background 0.19s"
              }}>Logout</button>
          </li>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;

import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <h3>MYSQL - CRUD</h3>
      <div className="menu">
        <Link className="link" to="/">Users</Link>
        <Link className="link" to="/posts">Posts</Link>
        <Link className="link" to="/add-user">Add User</Link>
        <Link className="link" to="/add-posts">Add Posts</Link>
      </div>
    </div>
  );
}

export default Header;

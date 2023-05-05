import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext)

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error.message))
  }

  return (


    <nav className="header ">
      <img src={logo} alt="" />
      <div className="nav">
        <Link to="/">Shop</Link>
        <Link to="/orders">Order</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to='/signup'>SignUp</Link>
      </div>

      {
        user && <p>Welcome!! {user.email} <button onClick={handleLogOut}>SignOut</button></p>
      }

    </nav>
  );
};

export default Header;

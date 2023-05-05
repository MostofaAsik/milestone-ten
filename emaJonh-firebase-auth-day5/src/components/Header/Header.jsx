import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const Header = () => {
  const { user, logOut } = useContext(AuthContext)
  console.log(user)

  const handleSignOut = () => {
    logOut()
      .then(() => { })
      .catch(error => {
        console.log(error);
      })
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
        {
          user && <span className="text-white">Welcome  {user.email} <button onClick={handleSignOut}>Sign Out</button></span>
        }

      </div>
    </nav>
  );
};

export default Header;

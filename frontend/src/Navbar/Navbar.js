import React from "react";
import { Link, NavLink } from "react-router-dom";
import AnimationStation from "../assets/images/AnimationStation2.png";
import "./index.css";

const Navbar = () => {
  return (
    <div className="">
      <nav className="nav-bar container">
        <ul className="nav-list">
          <li>
            <NavLink className="home" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className="animes" to='/anime'>Animes</NavLink>
          </li>
          <li>
            <NavLink className="cartoons" to='/cartoons'>Cartoons</NavLink>
          </li>
          <li>
            <NavLink className='about-us' to='aboutus'>About Us</NavLink>
          </li>{" "}
        </ul>
        <div className="logo-div">
        <Link className="logo" to="/">
          <img src={AnimationStation} alt="Logo" />
        </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

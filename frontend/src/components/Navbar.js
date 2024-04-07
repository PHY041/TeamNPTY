// import React, { useState } from "react";
import compass from "./assets/compass.png";
// import { FaTimes, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { FaUser, FaLock } from "react-icons/fa";

const Navbar = () => {
  // let logoutBtn = document.getElementById("logout-btn");

  // logoutBtn.addEventListener("click", () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/";
  // });

  return (
    <header className="header">
      <div className="container container--narrow">
        <a href="/home" className="header__logo">
          <img src={compass} alt="DevSearch Logo" id="compass_logo" />
        </a>
        <nav className="header__nav">
          <input type="checkbox" id="responsive-menu" />
          <label htmlFor="responsive-menu" className="toggle-menu">
            <span>Menu</span>
            <div className="toggle-menu__lines"></div>
          </label>
          <ul className="header__menu">
            <li className="header__menuItem">
              <NavLink to="/home" className="navitem">
                Home
              </NavLink>
            </li>
            <li className="header__menuItem">
              <NavLink to="/addevent" className="navitem">
                Add Event
              </NavLink>
            </li>
            <li className="header__menuItem">
              <NavLink to="/uploadimage" className="navitem">
                Upload File
              </NavLink>
            </li>
            <li className="header__menuItem">
              <a href="/" className="btn btn--sub" id="logout-btn">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

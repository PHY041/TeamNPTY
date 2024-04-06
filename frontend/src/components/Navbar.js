// import React, { useState } from "react";
import compass from "./assets/compass.png";
// import { FaTimes, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { FaUser, FaLock } from "react-icons/fa";

const Navbar = () => {
  return (
    <header class="header">
      <div class="container container--narrow">
        <a href="/home" class="header__logo" >
          <img src={compass} alt="DevSearch Logo" id="compass_logo" />
        </a>
        <nav class="header__nav">
          <input type="checkbox" id="responsive-menu" />
          <label for="responsive-menu" class="toggle-menu">
            <span>Menu</span>
            <div class="toggle-menu__lines"></div>
          </label>
          <ul class="header__menu">
            <li class="header__menuItem">
                <NavLink to="/home" activeClassName="active">Home</NavLink>
            </li>
            <li class="header__menuItem">
              <NavLink to="/addevent" activeClassName="active">Add Event</NavLink>
            </li>
            <li class="header__menuItem">
              <NavLink to="/uploadimage" activeClassName="active">Upload File</NavLink>
            </li>
            <li class="header__menuItem">
              <a href="{% url 'logout' %}" class="btn btn--sub" id="logout-btn">
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

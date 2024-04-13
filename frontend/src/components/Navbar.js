import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPlus,
  faFileUpload,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/background.png";
// import search_icon_dark from '../assets/search-b.png';

const Navbar = () => {
  return (
    <nav>
      <img src={logo} alt="compass logo" className="compass-logo" />
      <ul>
        <li>
          <NavLink to="/app/schedule">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span> Schedule</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/addevent">
            <FontAwesomeIcon icon={faPlus} />
            <span> Add Event</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/upload">
            <FontAwesomeIcon icon={faFileUpload} />
            <span> Upload file</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/profile">
            <FontAwesomeIcon icon={faUser} />
            <span> Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/logout" className="logout-nav">
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span> Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

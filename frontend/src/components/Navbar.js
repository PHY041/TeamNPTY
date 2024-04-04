import React, { useState } from "react";
import "./Navbar.css";
import compass from "./assets/compass.jpg";
import { FaTimes, FaBars } from "react-icons/fa";
import { Navlist } from "./Menulist";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={compass} alt="Compass Logo" />
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        {Navlist.map((item) => { return(
            <li key={item.key} className={item.cName}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
        )})}
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "#f8f8f8" }} />
        ) : (
          <FaBars size={30} style={{ color: "#f8f8f8" }} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

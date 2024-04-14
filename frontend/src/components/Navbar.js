import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlus, faFileUpload, faUser, faSignOutAlt, faBars  } from '@fortawesome/free-solid-svg-icons'; 
import logo from "../assets/background.png";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        setShowMenu(true);
        const componentsHide = document.querySelectorAll('.add-event, .edit-profile, .upload-image, .schedule-component');
        componentsHide.forEach(component => {
            component.style.display = 'none';
        });
    };
    const closeMenu = () => {
        setShowMenu(false);
        const componentsHide = document.querySelectorAll('.add-event, .edit-profile, .upload-image, .schedule-component');
        componentsHide.forEach(component => {
            component.style.display = 'block';
        });
    };
    
    return (
        <nav>
            <img src={logo} alt="compass logo" className='compass-logo'/>
            <button className="menu-toggle" onClick={openMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className={showMenu ? "open" : ""}>

                <li>
                    <NavLink to='/app/schedule' onClick={closeMenu}>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span> Schedule</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/app/addevent' onClick={closeMenu}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span> Add Event</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/app/upload' onClick={closeMenu}>
                        <FontAwesomeIcon icon={faFileUpload} />
                        <span> Upload file</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/app/profile' onClick={closeMenu}>
                        <FontAwesomeIcon icon={faUser} />
                        <span> Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/app/logout'>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span> Logout</span>
                    </NavLink>
                </li>
            </ul>
            
        </nav>
    )
}

export default Navbar;

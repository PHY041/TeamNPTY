// AppPage.js
import { React } from "react";
import { Route, Routes } from "react-router-dom";
import "./NavPages.css";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Schedule from "../components/Schedule";
import AddEvent from "../components/AddEvent";
import UploadImage from "../components/UploadImage";
import Logout from "./Logout";

const NavPages = () => {
  return (
    <div className="application-page">
      <Navbar />
      <Routes>
        <Route path="/schedule" element={<Schedule />} />
        {/* Pass updateEventData function to AddEvent component */}
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default NavPages;

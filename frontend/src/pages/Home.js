import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/background.png";

const Home = () => {
  return (
    <div className="auth">
      <div className="card">
        <img src={logo} alt="Card cap" className="start-logo" />
        <div className="card-body">
          <Link to="/signup" className="button-custom">
            Sign up
          </Link>
          <Link to="/login" className="button-custom">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

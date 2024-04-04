
import { useNavigate } from "react-router-dom";
import React from "react"; // If you're using React 17 or earlier, you need to import React
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md"

const Signup = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your authentication logic (e.g., checking email and password)
    
    // If login is successful, navigate to the home page
    navigate("/");
  };

  return (
    <div className="login">
    <div className="Login-form">
      <div className="title-app">COMPASS</div>
      <div className="Login-container">
        <div className="wrapper">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}> {/* Adjusted to call handleSubmit on form submission */}
            <div className="input-box">
              <input type="firstname" className="form-control" id="firstname" placeholder="Enter your first name" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="lastname" className="form-control" id="lastname" placeholder="Enter your last name" />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" required />
              <MdEmail className="icon" />
            </div>
            <div className="input-box">
              <input type="password" className="form-control" id="password" placeholder="Enter your prefered password" required/>
              <FaLock className="icon" />
            </div>

            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Signup;


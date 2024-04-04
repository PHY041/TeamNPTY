
import { NavLink, useNavigate } from "react-router-dom";
import React from "react"; // If you're using React 17 or earlier, you need to import React
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your authentication logic (e.g., checking email and password)
    
    // If login is successful, navigate to the home page
    navigate("/home");
  };

  return (
    <div className="login">
    <div className="Login-form">
      <div className="title-app">COMPASS</div>
      <div className="Login-container">
        <div className="wrapper">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}> {/* Adjusted to call handleSubmit on form submission */}
            <div className="input-box">
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" className="form-control" id="password" placeholder="Password" required/>
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox" id="remember" />Remember me</label>
                {/* <a href="#">Forgot password?</a> */}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>

            <div className="signup-link">
              <p>Don't have an account? <NavLink className="su" to="/signup">Signup</NavLink></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;


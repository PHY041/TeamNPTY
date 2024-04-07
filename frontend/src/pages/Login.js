import React from "react"; // If you're using React 17 or earlier, you need to import React
import "./main.css";
import image from "../components/assets/image.png";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    fetch("http://127.0.0.1:8000/api/users/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data.access);
        if (data.access) {
          localStorage.setItem("token", data.access);
          window.location.href = "/home";
        } else {
          alert("Username OR password did not work");
        }
      });

    console.log(formData);
  };

  return (
    <div className="auth">
      <div className="card">
        <div className="auth__header text-center">
          <img src={image} alt="logo" id="login-signup-image" />
          <h3>Compass</h3>
          <h4>Hello User, Welcome Back!</h4>
        </div>

        <form
          action=""
          method="POST"
          className="form auth__form"
          onSubmit={handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="formInput#text">Username: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="text"
              name="username"
              placeholder="Enter your username..."
            />
          </div>

          <div className="form__field">
            <label htmlFor="formInput#password">Password: </label>
            <input
              className="input input--password"
              id="formInput#password"
              type="password"
              name="password"
              placeholder="••••••••"
            />
          </div>
          <div className="auth__actions">
            <input className="btn btn--sub btn--lg" type="submit" value="Log In" />
            <a href="/">Forget Password?</a>
          </div>
        </form>
        <div className="auth__alternative">
          <p>Don’t have an Account?</p>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { NavLink, useNavigate } from "react-router-dom";
// import React from "react"; // If you're using React 17 or earlier, you need to import React
// import "./Login.css";
// import { FaUser, FaLock } from "react-icons/fa";

// const Login = () => {
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here, you can add your authentication logic (e.g., checking email and password)

//     // If login is successful, navigate to the home page
//     navigate("/home");
//   };

//   return (
//     <div className="login">
//     <div className="Login-form">
//       <div className="title-app">COMPASS</div>
//       <div className="Login-container">
//         <div className="wrapper">
//           <h1>Login</h1>
//           <form onSubmit={handleSubmit}> {/* Adjusted to call handleSubmit on form submission */}
//             <div className="input-box">
//               <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input type="password" className="form-control" id="password" placeholder="Password" required/>
//               <FaLock className="icon" />
//             </div>
//             <div className="remember-forgot">
//                 <label><input type="checkbox" id="remember" />Remember me</label>
//                 {/* <a href="#">Forgot password?</a> */}
//             </div>

//             <button type="submit" className="btn btn-primary">Submit</button>

//             <div className="signup-link">
//               <p>Don't have an account? <NavLink className="su" to="/signup">Signup</NavLink></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default Login;

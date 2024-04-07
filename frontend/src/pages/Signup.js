import image from "../components/assets/image.png";
import React from "react"; // If you're using React 17 or earlier, you need to import React

const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let password1 = event.target.password1.value;
    let password2 = event.target.password2.value;
    let password3;
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    } else {
      password3 = password1;
    }
    let formData = {
      name: event.target.name.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password: password3,
    };

    fetch("http://127.0.0.1:8000/api/users/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      //how to interpret if user has been created? if yes proceed to login page and display user created else display error message
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        } else {
          alert("Error creating user");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(formData);
  };

  return (
    <div className="auth">
      <div className="card">
        <div className="auth__header text-center">
          <img src={image} alt="logo" id="login-signup-image" />
          <h3>Compass</h3>
          <h4>Register an account</h4>
        </div>

        <form
          action=""
          method="POST"
          className="form auth__form"
          onSubmit={handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="name">Real Name: </label>
            <input
              className="input input--text"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your real name..."
            />
          </div>
          <div className="form__field">
            <label htmlFor="username">Username: </label>
            <input
              className="input input--text"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username..."
            />
          </div>
          <div className="form__field">
            <label htmlFor="email">Email address: </label>
            <input
              className="input input--text"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="form__field">
            <label htmlFor="password1">Password: </label>
            <input
              className="input input--text"
              type="password"
              name="password1"
              id="password1"
              placeholder="Enter your password..."
            />
          </div>
          <div className="form__field">
            <label htmlFor="password2">Password confirmation: </label>
            <input
              className="input input--text"
              type="password"
              name="password2"
              id="password2"
              placeholder="Enter your password again..."
            />
          </div>
          <div className="auth__actions">
            <input
              className="btn btn--sub btn--lg"
              type="submit"
              value="Sign up"
            />
          </div>
        </form>
        <div className="auth__alternative">
          <p>Already have an Account?</p>
          <a href="/">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useNavigate } from "react-router-dom";
// import React from "react"; // If you're using React 17 or earlier, you need to import React
// import "./Login.css";
// import { FaUser, FaLock } from "react-icons/fa";
// import { MdEmail } from "react-icons/md"

// const Signup = () => {
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Here, you can add your authentication logic (e.g., checking email and password)

//     // If login is successful, navigate to the home page
//     navigate("/");
//   };

//   return (
//     <div className="login">
//     <div className="Login-form">
//       <div className="title-app">COMPASS</div>
//       <div className="Login-container">
//         <div className="wrapper">
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}> {/* Adjusted to call handleSubmit on form submission */}
//             <div className="input-box">
//               <input type="firstname" className="form-control" id="firstname" placeholder="Enter your first name" required />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input type="lastname" className="form-control" id="lastname" placeholder="Enter your last name" />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" required />
//               <MdEmail className="icon" />
//             </div>
//             <div className="input-box">
//               <input type="password" className="form-control" id="password" placeholder="Enter your prefered password" required/>
//               <FaLock className="icon" />
//             </div>

//             <button type="submit" className="btn btn-primary">Register</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default Signup;

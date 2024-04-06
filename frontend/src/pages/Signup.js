import image from "../components/assets/image.png";
import React from "react"; // If you're using React 17 or earlier, you need to import React

const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = {
      name: event.target.name.value,
      username: event.target.username.value,
      email: event.target.email.value,
      password1: event.target.password1.value,
      password2: event.target.password2.value,
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
    <div class="auth">
      <div class="card">
        <div class="auth__header text-center">
          <img src={image} alt="logo"  id="login-signup-image"/>
          <h3>Compass</h3>
          <h4>Register an account</h4>
        </div>

        <form action="" method="POST" class="form auth__form" onSubmit={handleSubmit}>
          <div class="form__field">
            <label for="formInput#text">Real Name: </label>
            <input
              class="input input--text"
              id="formInput#text"
              type="text"
              name="name"
              placeholder="Enter your real name..."
            />
          </div>
          <div class="form__field">
            <label for="formInput#text">Username: </label>
            <input
              class="input input--text"
              id="formInput#text"
              type="text"
              name="username"
              placeholder="Enter your username..."
            />
          </div>
          <div class="form__field">
            <label for="formInput#text">Email address: </label>
            <input
              class="input input--text"
              id="formInput#text"
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div class="form__field">
            <label for="formInput#text">Password: </label>
            <input
              class="input input--text"
              id="formInput#text"
              type="password"
              name="password1"
              placeholder="Enter your password..."
            />
          </div>
          <div class="form__field">
            <label for="formInput#text">Password confirmation: </label>
            <input
              class="input input--text"
              id="formInput#text"
              type="password"
              name="password2"
              placeholder="Enter your password again..."
            />
          </div>
          <div class="auth__actions">
            <input class="btn btn--sub btn--lg" type="submit" value="Sign up" />
          </div>
        </form>
        <div class="auth__alternative">
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


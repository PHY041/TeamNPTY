import logo from "../assets/image.png";
import React from "react";
import "./Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

    fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      //how to interpret if user has been created? if yes proceed to login page and display user created else display error message
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        if (data.success) {
          window.location.href = "/login";
        } else {
          console.log("Success: ", data.success);
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
          <h4>
            <span>
              <a href="/">
                <img src={logo} alt="Compass logo" id="logo" />
              </a>
            </span>{" "}
            Sign up{" "}
          </h4>
        </div>
        <form
          action=""
          method="POST"
          className="form auth__form signup-form"
          onSubmit={handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="name">Name:* </label>
            <input
              className="input input--text"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name..."
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="email">Email address:* </label>
            <input
              className="input input--text"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="username">Username:* </label>
            <input
              className="input input--text"
              type="text"
              name="username"
              id="username"
              placeholder="Create your username..."
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="password1">Password:* </label>
            <input
              className="input input--text"
              type="password"
              name="password1"
              id="password1"
              placeholder="Enter your password..."
              required
            />
          </div>
          <div className="form__field">
            <label htmlFor="password2">Confirm Password:* </label>
            <input
              className="input input--text"
              type="password"
              name="password2"
              id="password2"
              placeholder="Enter your password again..."
              required
            />
          </div>
          {/* <div
            className="centerButton"
            role="button"
            onClick={handleSubmit}
            value="Sign up"
          >
            Sign up
          </div> */}

          <button className="button button--primary" type="submit">
            {" "}
            Sign up
          </button>
        </form>
        <div className="auth__alternative">
          <p>
            Already have an Account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

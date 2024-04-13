import React from "react"; // If you're using React 17 or earlier, you need to import React
import logo from "../assets/image.png";
import "./Auth.css";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    fetch("http://127.0.0.1:5000/login/users/token/", {
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
          window.location.href = "/app";
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
          <h4>
            <span>
              <a href="/">
                <img src={logo} alt="Compass logo" id="logo" />
              </a>
            </span>{" "}
            Login{" "}
          </h4>
        </div>

        <form
          action=""
          method="POST"
          className="form auth__form login-form"
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
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="formInput#password">Password: </label>
            <input
              className="input input--password"
              id="formInput#password"
              type="password"
              name="password"
              placeholder="Enter password..."
              required
            />
          </div>
          {/* <div className="centerButton" role="button">
            Login
          </div> */}

          <button className="button button--primary" type="submit"> Log in
          </button>
          
          <div className="auth__actions">
            <a href="/">Forget Password?</a>
          </div>
        </form>
        <div class="auth__alternative">
          <p>
            Don’t have an Account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

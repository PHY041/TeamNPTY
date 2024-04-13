import React from "react"; // If you're using React 17 or earlier, you need to import React
import logo from "../assets/image.png";
import "./Auth.css";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        if (data.success) {
          localStorage.setItem("token", data.id_token);
          window.location.href = "/app";

        } else {
          alert("Email OR password did not work");
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
            <label htmlFor="formInput#text">Email: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="email"
              name="email"
              placeholder="Enter your email..."
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

          <button className="button button--primary" type="submit">
            {" "}
            Log in
          </button>

          <div className="auth__actions">
            <a href="/">Forget Password?</a>
          </div>
        </form>
        <div className="auth__alternative">
          <p>
            Don’t have an Account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import Sidebar from "../components/Sidebar"; // Importing Sidebar component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Uploadimage = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [eventDescription, setEventDescription] = useState("");

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can add your authentication logic (e.g., checking email and password)

    // If login is successful, navigate to the home page
    navigate("/home");
  };

  return (
    <>
      <Navbar />

      <h1>Upload Image</h1>

      <main class="formPage my-xl">
        <div class="content-box">
          <div class="formWrapper">
            <a class="backButton" href="/home">
              <i class="im im-angle-left">&#60;</i>
            </a>
            <br />

            <form
              class="form"
              method="POST"
              enctype="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="form__field">
                <label htmlFor="formInput#text">Upload file: </label>
                <input type="file" className="input input--file" id="file" name="file" required />
              </div>
              <div className="form__field">
                <label htmlFor="formInput#text">Description: </label>
                <textarea
                  id="description"
                  name="description"
                  value={eventDescription}
                  onChange={handleEventDescriptionChange}
                  className="input input--textarea"
                  rows="4" // You can set the number of rows to display
                  cols="50" // You can set the number of columns to define its width
                  placeholder="Enter description here..."
                ></textarea>
              </div>
              
              <input
                class="btn btn--sub btn--lg my-md"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Uploadimage;

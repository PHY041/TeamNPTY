// import Sidebar from "../components/Sidebar"; // Importing Sidebar component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Addevent = () => {
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

      <h1>Event Form</h1>

      <main className="formPage my-xl">
        <div className="content-box">
          <div className="formWrapper">
            <a className="backButton" href="/home">
              <i className="im im-angle-left">&#60;</i>
            </a>
            <br />

            <form
              class="form"
              method="POST"
              enctype="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="form__field">
                <label htmlFor="formInput#text">Title of Event: </label>
                <input
                  type="text"
                  className="input input--text"
                  id="title"
                  name="title"
                  required
                />
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
              <div className="form__field">
                <label htmlFor="formInput#text">Start of Event: </label>
                <input
                  type="datetime-local"
                  className="input input--datetime-local"
                  id="startofevent"
                  name="startofevent"
                />
              </div>
              <div className="form__field">
                <label htmlFor="formInput#text">End of Event: </label>
                <input
                  type="datetime-local"
                  className="input input--datetime-local"
                  id="endofevent"
                  name="endofevent"
                />
              </div>
              <div className="form__field">
                <label htmlFor="formInput#text">Location: </label>
                <input
                  type="text"
                  className="input input--text"
                  id="location"
                  name="location"
                />
              </div>
              <div className="form__field">
                <label htmlFor="formInput#text">
                  Is Online ?
                </label>
                <input
                  type="checkbox"
                  className="input input--checkbox"
                  id="isonline"
                  name="isonline"
                />
              </div>

              <input
                className="btn btn--sub btn--lg my-md"
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

export default Addevent;

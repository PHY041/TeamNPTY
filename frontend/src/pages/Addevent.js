// import Sidebar from "../components/Sidebar"; // Importing Sidebar component
import Navbar from "../components/Navbar"; // Importing Navbar component
import { useNavigate } from "react-router-dom";
import "./Addevent.css";
import React, { useState } from "react";

const Addevent = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [eventDescription, setEventDescription] = useState("");
  const [fileDescription, setFileDescription] = useState("");

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };
  const handleImageDescriptionChange = (event) => {
    setFileDescription(event.target.value);
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

      <div className="input-container">
        <div className="event-container">
          <div className="input-headers">
            <h2>Add Event</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="event1-container">
              <label className="label-create-event" htmlFor="title">
                Title of Event:
              </label>
              <input type="text" className="event-form" id="title" />
            </div>
            <div className="event1-container">
              <label className="label-create-event" htmlFor="description">
                Description :
              </label>
              <textarea
                id="description"
                name="description"
                value={eventDescription}
                onChange={handleEventDescriptionChange}
                className="description-textarea"
                rows="4" // You can set the number of rows to display
                cols="50" // You can set the number of columns to define its width
                placeholder="Enter description here..."
              ></textarea>
            </div>
            <div className="event1-container">
              <label className="label-create-event" htmlFor="startofevent">
                Start of Event :
              </label>
              <input
                type="datetime-local"
                className="event-form"
                id="startofevent"
              />
            </div>
            <div className="event1-container">
              <label className="label-create-event" htmlFor="endofevent">
                End of Event :
              </label>
              <input
                type="datetime-local"
                className="event-form"
                id="endofevent"
              />
            </div>
            <div className="event1-container">
              <label className="label-create-event" htmlFor="isonline">
                Is online ?
              </label>
              <input type="checkbox" className="event-form" id="isonline" />
            </div>

            <div className="event1-container">
              <label className="label-create-event" htmlFor="location">
                Location :
              </label>
              <input type="text" className="event-form" id="location" />
            </div>

            <div className="Inputpagebutton">
              <button type="submit" className="btn btn-primary">
                Create Event
              </button>
            </div>
          </form>
        </div>

        <div className="inputimage-container">
          <div className="input-headers">
            <h2>Input Timetable Image</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputimage1-container">
              <label className="label-input-timetable" htmlFor="image">
                Input file :
              </label>
              <input type="file" className="event-form" id="image" required />
            </div>

            <div className="inputimage1-container">
              <label className="label-create-event" htmlFor="description">
                Description :
              </label>
              <textarea
                id="description"
                name="description"
                value={fileDescription}
                onChange={handleImageDescriptionChange}
                className="description-textarea"
                rows="4" // You can set the number of rows to display
                cols="50" // You can set the number of columns to define its width
                placeholder="Enter description here..."
              ></textarea>
            </div>
            <div className="Inputpagebutton">
              <button type="submit" className="btn btn-primary">
                Input Timetable
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addevent;

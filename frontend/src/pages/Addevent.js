// import Sidebar from "../components/Sidebar"; // Importing Sidebar component
import Navbar from "../components/Navbar"; // Importing Navbar component
import React, { useState } from "react";
// import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

const Addevent = () => {
  const [eventDescription, setEventDescription] = useState("");

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");

    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let startofevent = `${start}:00Z`;
    let endofevent = `${end}:00Z`;

    let formData = {
      title: event.target.title.value,
      description: event.target.description.value,
      startofevent: startofevent,
      endofevent: endofevent,
      location: event.target.location.value,
      isonline: event.target.isonline.checked,
    };
    //replace the url with the url of the api
    fetch("http://127.0.0.1:8000/api/users/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/home";
          console.log("Event created successfully");
        } else {
          alert("Error creating event");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(formData);
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
              className="form"
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="form__field">
                <label htmlFor="title">Title of Event: </label>
                <input
                  type="text"
                  className="input input--text"
                  id="title"
                  name="title"
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="description">Description: </label>
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
                <label htmlFor="start">Start of Event: </label>
                <input
                  type="datetime-local"
                  className="input input--datetime-local"
                  id="start"
                  name="start"
                  required
                />
                {/* <div className="datetimepicker-control-section">
                  <DateTimePickerComponent></DateTimePickerComponent>
                </div> */}
              </div>
              <div className="form__field">
                <label htmlFor="end">End of Event: </label>
                <input
                  type="datetime-local"
                  className="input input--datetime-local"
                  id="end"
                  name="end"
                  required
                />
                {/* <div className="datetimepicker-control-section">
                  <DateTimePickerComponent></DateTimePickerComponent>
                </div> */}
              </div>
              <div className="form__field">
                <label htmlFor="location">Location: </label>
                <input
                  type="text"
                  className="input input--text"
                  id="location"
                  name="location"
                />
              </div>
              <div className="form__field">
                <label htmlFor="isonline">Is Online ?</label>
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

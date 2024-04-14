// AddEvent.js
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../pages/NavPages.css"; // Import CSS file for styling

const AddEvent = () => {
  const [eventDescription, setEventDescription] = useState("");
  const [startTimeUTC, setStartTimeUTC] = useState("");
  const [endTimeUTC, setEndTimeUTC] = useState("");

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  // Note: This handler will convert local Singapore time to UTC and save it in state
  const handleDatetimeLocalInputChange = (inputId, event) => {
    const localDateTime = event.target.value;
    const timezoneOffset = "+08:00"; // Singapore Timezone Offset
    const localDateTimeWithTimezone = `${localDateTime}:00${timezoneOffset}`; // Append seconds and timezone
    const date = new Date(localDateTimeWithTimezone);
    const utcDateTime = date.toISOString();

    // Update the corresponding state based on inputId
    if (inputId === "startOfEvent") {
      setStartTimeUTC(utcDateTime);
    } else if (inputId === "endOfEvent") {
      setEndTimeUTC(utcDateTime);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new event data to the existing event data
    let token = localStorage.getItem("token");

    let formData = {
      title: event.target.event_title.value,
      description: event.target.event_description.value,
      startofevent: startTimeUTC,
      endofevent: endTimeUTC,
      location: event.target.location.value,
      isonline: event.target.isonline.checked,
    };

    //replace the url with the url of the api
    fetch("http://127.0.0.1:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/app";
          console.log("Event created successfully");
        } else {
          console.log("Error: ", data.error);
          console.log("Success: ", data.success);
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(formData);
  };

  return (
    <div className="add-event">
      <a href="/app/schedule">
        <FontAwesomeIcon icon={faChevronLeft} />
      </a>
      <h3>New Event</h3>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form__field">
          <input
            type="text"
            id="event_title"
            name="event_title"
            placeholder="Add event title..."
            required
          />
        </div>
        <div className="form__field">
          <textarea
            id="event_description"
            name="event_description"
            value={eventDescription}
            onChange={handleEventDescriptionChange}
            rows="3"
            placeholder="Enter description here..."
          ></textarea>
        </div>
        <div className="form__field">
          <div className="date-inputs">
            <div className="date-input">
              <label htmlFor="startOfEvent">Start of Event</label>
              <input
                type="datetime-local"
                id="startOfEvent"
                name="startOfEvent"
                onChange={(e) =>
                  handleDatetimeLocalInputChange("startOfEvent", e)
                }
                required
              />
            </div>
            <div className="date-input">
              <label htmlFor="endOfEvent">End of Event</label>
              <input
                type="datetime-local"
                id="endOfEvent"
                name="endOfEvent"
                onChange={(e) =>
                  handleDatetimeLocalInputChange("endOfEvent", e)
                }
                required
              />
            </div>
          </div>
        </div>
        <div className="form__field">
          <label>
            Online Event?
            <input type="checkbox" name="isonline" id="isonline" />
          </label>
        </div>
        <div className="form__field">
          <label htmlFor="location">
            Venue (Leave blank if event is online){" "}
          </label>
          <input type="text" id="location" name="location" />
        </div>

        <button type="submit" className="submit-btn">
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;

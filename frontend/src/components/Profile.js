import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import EventsChart from "./EventsChart";
import Loading from "./Loading";

const Profile = () => {
  const event_data = [
    { day: "Monday", duration: 3 }, // duration in hours
    { day: "Tuesday", duration: 2 },
    { day: "Wednesday", duration: 8 },
    { day: "Thursday", duration: 4 },
    { day: "Friday", duration: 1 },
    { day: "Saturday", duration: 0 },
    { day: "Sunday", duration: 2 },
  ];
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newpassword = event.target.newpassword.value;
    let confirmpassword = event.target.confirmpassword.value;
    let token = localStorage.getItem("token");

    if (newpassword !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    let formData = {
      password: newpassword,
    };

    setIsLoading(true); // Start loading
    fetch("http://127.0.0.1:5000/updatepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        if (data.success) {
          // Password reset successful, maybe redirect to login page
          window.location.href = "/app/profile";
          alert("Password changed successful");
          setIsLoading(false);
        } else {
          console.log("Success: ", data.success);
          alert(data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error resetting password");
        setIsLoading(false);
      });

    console.log(formData);
  };
  const [eventSummary, setEventSummary] = useState("");
  // const [event_data, setEvent_data] = useState([]);
  // Fetch past events data
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true); // Start loading
    fetch("http://127.0.0.1:5000/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // setEvent_data(data.event_data);
        // Assume calculateSummary is a function to analyze events data
        setEventSummary(calculateSummary(data.summary));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events data:", error);
        setIsLoading(false);
      });
  }, []);

  const calculateSummary = (events) => {
    let summary = "No events found";
    if (!events.length) return summary;
    // Perform analysis, e.g., count types of events, sum durations, etc.
    else summary = events; // Placeholder
    return summary;
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <div className="container-profile-all">
          <div className="container-left-column">
            <div className="edit-profile container-reset-password">
              <a href="/app/schedule">
                <FontAwesomeIcon icon={faChevronLeft} />
              </a>
              <br />
              <h3>Change Password</h3>

              <form
                action=""
                method="POST"
                className="form auth__form reset-pw-form"
                onSubmit={handleSubmit}
              >

                <div className="form__field">
                  <label htmlFor="reset_password">New password:* </label>
                  <input
                    className="input input--password"
                    id="reset_password"
                    type="password"
                    name="newpassword"
                    placeholder="New Password..."
                    required
                  />
                </div>
                <div className="form__field">
                  <label htmlFor="confirmpassword">Confirm password:* </label>
                  <input
                    className="input input--password"
                    id="confirmpassword"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm New Password:"
                    required
                  />
                </div>
                <button className="button button--primary" type="submit">
                  {" "}
                  Change Password{" "}
                </button>
              </form>
            </div>
          </div>
          <div className="container-right-column">
            <div className="edit-profile container-profile-events">
              <h4>Past Week Events</h4>
              {/* <div className="event-container">
        <ul className="event-list">
          <li className="event-item">Event 1 - Location 1</li>
          <li className="event-item">Event 2 - Location 2</li>
          <li className="event-item">Event 2 - Location 2</li>
          <li className="event-item">Event 2 - Location 2</li>
          <li className="event-item">Event 2 - Location 2</li>
        </ul>
        </div> */}
              <EventsChart events={event_data} />
            </div>
            <div className="edit-profile containter-profile-summary">
              <h4>Event Summary</h4>
              <div className="event-summary">
                <p>{eventSummary}</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;

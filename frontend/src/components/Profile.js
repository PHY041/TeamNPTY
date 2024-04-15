import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import EventsChart from "./EventsChart";
import Loading from "./Loading";
import { convertLength } from "@mui/material/styles/cssUtils";

const Profile = () => {
  // const event_data = [
  //   { day: "Monday", duration: 3 }, // duration in hours
  //   { day: "Tuesday", duration: 2 },
  //   { day: "Wednesday", duration: 8 },
  //   { day: "Thursday", duration: 4 },
  //   { day: "Friday", duration: 1 },
  //   { day: "Saturday", duration: 0 },
  //   { day: "Sunday", duration: 2 },
  // ];
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
  const [event_data, setEventData] = useState([]);
  // Fetch past events data
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true); // Start loading
    fetch("http://127.0.0.1:5000/my-events-summary", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(data => {
        console.log("DATA:", data);
        const formattedEventData = {
          "Monday": data.events.Monday || 0, // Using '|| 0' to provide a default value in case a day isn't present in the response
          "Tuesday": data.events.Tuesday || 0,
          "Wednesday": data.events.Wednesday || 0,
          "Thursday": data.events.Thursday || 0,
          "Friday": data.events.Friday || 0,
          "Saturday": data.events.Saturday || 0,
          "Sunday": data.events.Sunday || 0,
          // "Summary": data[0].Summary
        };
        setEventData(formattedEventData);
        console.log(formattedEventData);
        // Assume calculateSummary is a function to analyze events data
        setEventSummary(data.summary);
        setIsLoading(false);
      })
      
      .catch((error) => {
        console.error("Error fetching events data:", error);
        setIsLoading(false);
      });
  }, []);


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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;

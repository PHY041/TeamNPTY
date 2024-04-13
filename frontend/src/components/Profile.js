import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    // Fetch initial user data from API
    fetch("/api/getProfileData")
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data); // Assuming the data structure matches profileData state
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []); // Empty dependency array to run once when component mounts

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make API request to update user profile data
      const response = await fetch("/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        // Handle successful update
        console.log("Profile updated successfully!");
      } else {
        // Handle error
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="edit-profile">
      <a href="/app/schedule">
        <FontAwesomeIcon icon={faChevronLeft} />
      </a>
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="form__field">
              <label>Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="user-real-name"
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="form__field">
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="user-username"
                required
              />
            </div>
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="user-email"
            required
          />
        </div>
        <div className="form__field">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            className="user-password"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};
export default Profile;

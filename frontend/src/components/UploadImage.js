import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../pages/NavPages.css";

const Uploadimage = () => {
  const [eventDescription, setEventDescription] = useState("");

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const fileInput = event.target.file;
    let file = fileInput.files[0];
    let formData = {
      file: file,
      description: event.target.description.value,
    };
    //replace the url with the url of the api
    fetch("http://127.0.0.1:8000/api/users/token/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        if (data) {
          alert("Image uploaded successfully");
          window.location.href = "/app";
        } else {
          alert("Failed to upload image");
        }
      });

    console.log(formData);
  };

  return (
    <>
      <div className="upload-image">
        <a href="/app/schedule">
          <FontAwesomeIcon icon={faChevronLeft} />
        </a>
        <h3>Upload File</h3>
        <form
          className="form"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="form__field">
            <label htmlFor="file">Upload image (.png, .jpg, .webp): </label>
            <input
              type="file"
              className="input input--file"
              id="file"
              name="file"
              accept="image/png, image/jpeg, image/webp"
              required
            />
          </div>
          <div className="form__field">
            <textarea
              id="description"
              name="description"
              value={eventDescription}
              onChange={handleEventDescriptionChange}
              className="input input--textarea"
              rows="4" // You can set the number of rows to display
              cols="50" // You can set the number of columns to define its width
              placeholder="Describe file (Optional)"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Upload Image
          </button>
          
        </form>
      </div>
    </>
  );
};

export default Uploadimage;

// import Sidebar from "../components/Sidebar"; // Importing Sidebar component
import Navbar from "../components/Navbar"; // Importing Navbar component
import React, { useState } from "react";

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
          window.location.href = "/home";
        } else {
          alert("Failed to upload image");
        }
      });

    console.log(formData);
  };

  return (
    <>
      <Navbar />

      <h1>Upload Image</h1>

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
                <label htmlFor="file">
                  Upload image (PNG, JPG,WEBP):{" "}
                </label>
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

export default Uploadimage;

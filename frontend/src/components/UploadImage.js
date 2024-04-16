import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../pages/NavPages.css";
import Loading from "./Loading";

const Uploadimage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const handlePaste = useCallback(async (event) => {
    if (event.clipboardData && event.clipboardData.items) {
      const items = event.clipboardData.items;

      for (const item of items) {
        if (item.type.indexOf("image") === 0) {
          const blob = item.getAsFile();

          // Set the image in the component state
          setImage(blob);

          // Create a preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  }, []);

  // Attach the paste event listener to the window
  useEffect(() => {
    window.addEventListener("paste", handlePaste);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  const [isLoading, setIsLoading] = useState(false);
  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };

  // remove the image and reset the default preview 
  const handleImageRemove = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    } else {
      formData.append("file", file);
    } // Append the file under the 'file' key
    formData.append("description", event.target.description.value); // Append the description

    setIsLoading(true); // Start loading
    //replace the url with the url of the api
    fetch("http://127.0.0.1:5000/extract", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA:", data);
        if (data.success) {
          alert("Image uploaded successfully");
          window.location.href = "/app";
          setIsLoading(false);
        } else {
          alert("Failed to upload image");
          setIsLoading(false);
        }
      });

    console.log(formData);
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <div className="upload-image">
          <a href="/app/schedule">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
          <h3>Upload Image File</h3>
          <form
            className="form"
            method="POST"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="form__field">
              <label htmlFor="file">Upload image (.png, .jpg, .webp): </label>
              {/* <FileInput /> */}
              <input
                type="file"
                className="input input--file"
                id="file"
                name="file"
                accept="image/png, image/jpeg, image/webp"
                
              />
              {/* <div className="input input--image">
                <p>Paste an image here...</p>
              {preview && <img src={preview} className="file-image" alt="Preview" />}
              </div> */}
              <div className="image-preview">
                {preview ? (
                  <>
                    <button className="remove-image-btn" onClick={handleImageRemove}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <img src={preview} className="file-image" alt="Preview" />
                    
                  </>
                ) : (
                  <p>Copy and Paste an image here...</p>
                )}
              </div>
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
      )}
    </>
  );
};

export default Uploadimage;

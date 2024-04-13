import { useState, useEffect } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import "../pages/NavPages.css";
// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXxcdXVVRWJdUUByXkE="
);

const Scheduler = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5000/my-events", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Transform the data from Firebase format to the format expected by Syncfusion Scheduler
        console.log(data);
        const firebaseDataArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
    
        // Now transform the array of Firebase data to the format expected by Syncfusion Scheduler
        const transformedEvents = firebaseDataArray.map(event => ({
          Id: event.id,
          Subject: event.title,
          StartTime: new Date(event.startofevent),
          EndTime: new Date(event.endofevent),
          Description: event.description,
          Location: event.location,
          IsOnline: event.isonline,
          // ... add other necessary fields
        }));
    
        setEvents(transformedEvents);
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
    }, []);
    
  const handleAddEvent = (args) => {
    // Send request to external API to add event
    let token = localStorage.getItem("token");
    let startofevent = args.data[0].StartTime.toISOString();
    let endofevent = args.data[0].EndTime.toISOString();
    startofevent = startofevent.replace(/\.\d{3}/, "");
    endofevent = endofevent.replace(/\.\d{3}/, "");

    let formData = {
      title: args.data[0].Subject,
      description: args.data[0].Description,
      startofevent: startofevent,
      endofevent: endofevent,
      location: args.data[0].Location,
      isonline: args.data[0].isOnline,
    };
    fetch(`http://127.0.0.1:5000/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/app";
          console.log("Event updated successfully");
        } else {
          alert("Error updating event");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(formData);
    console.log("event added");
    // Use args.data to access the event data
  };

  const handleEditEvent = (args) => {
    // Send request to external API to edit event
    let token = localStorage.getItem("token");
    let startofevent = args.data.StartTime.toISOString();
    let endofevent = args.data.EndTime.toISOString();
    startofevent = startofevent.replace(/\.\d{3}/, "");
    endofevent = endofevent.replace(/\.\d{3}/, "");
    let id = args.data.Id;
    let formData = {
      id: id,
      title: args.data.Subject,
      description: args.data.Description,
      startofevent: startofevent,
      endofevent: endofevent,
      location: args.data.Location,
      isonline: args.data.isOnline,
    };
    fetch(`http://127.0.0.1:5000/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/app";
          console.log("Event updated successfully");
        } else {
          alert("Error updating event");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(formData);
    console.log("event updated");
    // Use args.data to access the event data
  };

  const handleDeleteEvent = (args) => {
    // Send request to external API to delete event
    let token = localStorage.getItem("token");
    let startofevent = args.data[0].StartTime.toISOString();
    let endofevent = args.data[0].EndTime.toISOString();
    let id = args.data[0].Id;
    startofevent = startofevent.replace(/\.\d{3}/, "");
    endofevent = endofevent.replace(/\.\d{3}/, "");

    let formData = {
      id: id,
      title: args.data[0].Subject,
      description: args.data[0].Description,
      startofevent: startofevent,
      endofevent: endofevent,
      location: args.data[0].Location,
      isonline: args.data[0].isOnline,
    };
    fetch(`http://127.0.0.1:5000/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/app";
          console.log("Event deleted successfully");
        } else {
          alert("Error deleting event");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(formData);

    // Use args.data to access the event data
  };
  return (
    <div className="schedule-control-section">
      <div className="control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width="100%"
            height="100%"
            currentView="Week"
            eventSettings={{ dataSource: events }}
            readonly={false}
            actionBegin={(args) => {
              if (args.requestType === "eventCreate") {
                handleAddEvent(args);
              } else if (args.requestType === "eventChange") {
                handleEditEvent(args);
              } else if (args.requestType === "eventRemove") {
                handleDeleteEvent(args);
              }
            }}
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="Month" />
            </ViewsDirective>
            <Inject services={[Day, Week, Month]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};
export default Scheduler;

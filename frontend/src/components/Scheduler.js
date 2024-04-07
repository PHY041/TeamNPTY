import { useState, useEffect } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import "../pages/main.css"; // import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
// import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { DataManager, ODataV4Adaptor} from "@syncfusion/ej2-data";
// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXxcdXVVRWJdUUByXkE="
);

const Scheduler = () => {

  // const dataManager = new DataManager({
  //   //replace the following url with our own Django endpoint
  //   url: "https://services.syncfusion.com/react/production/api/schedule",
  //   adaptor: new WebApiAdaptor(),
  //   crossDomain: true,
  // });

  const [dataManager, setDataManager] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const manager = new DataManager({
        //replace the following url with our own Django endpoint
        url: "https://services.syncfusion.com/react/production/api/schedule",
        adaptor: new ODataV4Adaptor(),
      });
      await manager.ready;
      setDataManager(manager);
    };
    fetchData();
  }, []);

  const fieldsData = {
    id: { name: "Id" },
    // subject: { name: "Title" }, //this is for the our own compass app
    subject: { name: "Subject" },
    location: { name: "Location" },
    description: { name: "Description" },
    startTime: { name: "StartTime" },
    endTime: { name: "EndTime" },
    isOnline: { name: "IsOnline" },
  };

  // const handlenewevent = (event) => {
  //   event.preventDefault();
  //   let token = localStorage.getItem("token");

  //   let start = document.getElementById("start").value;
  //   let end = document.getElementById("end").value;
  //   let startofevent = `${start}:00Z`;
  //   let endofevent = `${end}:00Z`;

  //   let formData = {
  //     title: event.target.title.value,
  //     description: event.target.description.value,
  //     startofevent: startofevent,
  //     endofevent: endofevent,
  //     location: event.target.location.value,
  //     isonline: event.target.isonline.checked,
  //   };
  //   //replace the url with the url of the api
  //   fetch("http://127.0.0.1:8000/api/users/token/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("DATA:", data);
  //       if (data) {
  //         alert("Event added successfully");
  //         window.location.href = "/home";
  //       } else {
  //         alert("Failed to add event");
  //       }
  //     });

  //   console.log(formData);
  // };
  // const handleeditevent = (event) => {
  //   event.preventDefault();
  //   let token = localStorage.getItem("token");

  //   let start = document.getElementById("start").value;
  //   let end = document.getElementById("end").value;
  //   let startofevent = `${start}:00Z`;
  //   let endofevent = `${end}:00Z`;

  //   let formData = {
  //     title: event.target.title.value,
  //     description: event.target.description.value,
  //     startofevent: startofevent,
  //     endofevent: endofevent,
  //     location: event.target.location.value,
  //     isonline: event.target.isonline.checked,
  //   };
  //   //replace the url with the url of the api
  //   fetch("http://127.0.0.1:8000/api/users/token/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("DATA:", data);
  //       if (data) {
  //         alert("Event added successfully");
  //         window.location.href = "/home";
  //       } else {
  //         alert("Failed to add event");
  //       }
  //     });

  //   console.log(formData);
  // };
  // const handledeleteevent = (event) => {
  //   event.preventDefault();
  //   let token = localStorage.getItem("token");

  //   let start = document.getElementById("start").value;
  //   let end = document.getElementById("end").value;
  //   let startofevent = `${start}:00Z`;
  //   let endofevent = `${end}:00Z`;

  //   let formData = {
  //     title: event.target.title.value,
  //     description: event.target.description.value,
  //     startofevent: startofevent,
  //     endofevent: endofevent,
  //     location: event.target.location.value,
  //     isonline: event.target.isonline.checked,
  //   };
  //   //replace the url with the url of the api
  //   fetch("http://127.0.0.1:8000/api/users/token/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("DATA:", data);
  //       if (data) {
  //         alert("Event added successfully");
  //         window.location.href = "/home";
  //       } else {
  //         alert("Failed to add event");
  //       }
  //     });

  //   console.log(formData);
  // };

  return (
    <div className="schedule-control-section">
      <div className="control-section">
        <div className="control-wrapper">
          
          <ScheduleComponent
            width="100%"
            height="100%"
            currentView="Week"
            eventSettings={{ dataSource: dataManager, fields: fieldsData }}
            readonly={false}
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="WorkWeek" />
              <ViewDirective option="Month" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};
export default Scheduler;

// const Scheduler = () => {
//   let data = [
//     {
//       Id: 1,
//       Title: "Explosion of Betelgeuse Star",
//       StartTime: new Date(2024, 3, 2, 9, 30),
//       EndTime: new Date(2024, 3, 2, 11, 0),
//     },
//     {
//       Id: 2,
//       Title: "Thule Air Crash Report",
//       Location: "New York",
//       StartTime: new Date(2024, 3, 2, 12, 0),
//       EndTime: new Date(2024, 3, 2, 14, 0),
//     },
//     {
//       Id: 3,
//       Title: "Blue Moon Eclipse",
//       StartTime: new Date(2024, 3, 2, 9, 30),
//       EndTime: new Date(2024, 3, 2, 11, 0),
//     },
//     {
//       Id: 4,
//       Title: "Meteor Showers in 2018",
//       StartTime: new Date(2024, 3, 2, 13, 0),
//       EndTime: new Date(2024, 3, 2, 14, 30),
//     },
//   ];

//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     try {
//   //       const response = await fetch("https://your-django-endpoint");
//   //       const jsonData = await response.json();
//   //       setData(jsonData);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   }

//   //   fetchData();
//   // }, []);

//   const fieldsData = {
//     id: { name: "Id" },
//     subject: { name: "Title" },
//     location: { name: "Location" },
//     description: { name: "Description" },
//     startTime: { name: "StartTime" },
//     endTime: { name: "EndTime" },
//     isOnline: { name: "IsOnline" },
//   };
//   const eventSettings = { dataSource: data, fields: fieldsData };

//   return (
//     <ScheduleComponent
//       currentView="Week"
//       readonly={true}
//       eventSettings={eventSettings}
//     >
//       <Inject services={[Day, Week, WorkWeek, Month]} />
//     </ScheduleComponent>
//   );
// };

// export default Scheduler;
